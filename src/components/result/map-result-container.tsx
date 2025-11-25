"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Navigation, ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { AdvancedCard } from "@/components/ui/advanced-card";
import { RecommendationBar } from "./recommendation-bar";
import { AnalysisResponse } from "@/types/company";
import { CheckCircle, XCircle, AlertTriangle, Clock } from "lucide-react";
import dynamic from 'next/dynamic';

// Importa Leaflet de forma dinâmica (apenas no cliente)
const MapComponent = dynamic(
  () => import('react-leaflet').then(async (mod) => {
    // Importa a configuração do Leaflet
    await import('@/lib/leaflet-config');

    const { MapContainer, TileLayer, Marker, Popup, useMap } = mod;

    // Componente para botão de recentralizar
    function RecenterButton({ position }: { position: [number, number] }) {
      const map = useMap();

      return (
        <button
          onClick={() => map.setView(position, 18)}
          className="leaflet-control leaflet-bar"
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            zIndex: 1000,
            backgroundColor: 'white',
            border: '2px solid rgba(0,0,0,0.2)',
            borderRadius: '4px',
            width: '34px',
            height: '34px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '18px',
            boxShadow: '0 1px 5px rgba(0,0,0,0.65)',
          }}
          title="Voltar ao marcador"
        >
          📍
        </button>
      );
    }

    return function Map({ position, address }: { position: [number, number]; address: string }) {
      return (
        <MapContainer
          center={position}
          zoom={18}
          style={{ height: '300px', width: '100%' }}
          scrollWheelZoom={true}
          fadeAnimation={false}
          zoomAnimation={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>{address}</Popup>
          </Marker>
          <RecenterButton position={position} />
        </MapContainer>
      );
    };
  }),
  { ssr: false }
);

const iconMap = {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock
};

interface MapResultContainerProps {
  result: AnalysisResponse;
}

export function MapResultContainer({ result }: MapResultContainerProps) {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [mapPosition, setMapPosition] = useState<[number, number] | null>(null);
  const [isLoadingMap, setIsLoadingMap] = useState(true);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Usar dados do locationDetails se disponível, senão usar companyData
  const rua = result.locationDetails?.rua || result.companyData.rua || '';
  const bairro = result.locationDetails?.bairro || result.companyData.bairro || '';
  const cidade = result.locationDetails?.cidade || result.companyData.cidade || '';
  const uf = result.locationDetails?.uf || result.companyData.uf || '';
  const numero = result.companyData.numero || '';
  const cep = result.locationDetails?.cep || result.companyData.endereco || '';

  // Verificar se temos dados de endereço válidos
  const hasAddressData = rua || bairro || cidade;

  // Monta o endereço completo
  const fullAddress = hasAddressData 
    ? [rua, numero, bairro, cidade, uf, 'Brasil'].filter(Boolean).join(', ')
    : `CEP: ${cep}, Brasil`;

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Busca coordenadas quando o mapa é aberto
  useEffect(() => {
    if (!isMapOpen || mapPosition) return;

    // Se já temos detalhes de localização do backend, usar eles
    if (result.locationDetails?.latitude && result.locationDetails?.longitude) {
      const lat = parseFloat(result.locationDetails.latitude);
      const lng = parseFloat(result.locationDetails.longitude);
      if (!isNaN(lat) && !isNaN(lng)) {
        setMapPosition([lat, lng]);
        setIsLoadingMap(false);
        return;
      }
    }

    const geocodeAddress = async () => {
      setIsLoadingMap(true);
      try {
        // Usa ArcGIS Geocoding Service (Esri) - Geralmente mais preciso para números no Brasil
        const searchQuery = `${rua}, ${numero}, ${bairro}, ${cidade}, ${uf}, Brasil`;

        const response = await fetch(
          `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?` +
          `f=json&` +
          `singleLine=${encodeURIComponent(searchQuery)}&` +
          `maxLocations=1`,
          {
            method: 'GET',
          }
        );

        if (response.ok) {
          const data = await response.json();

          if (data && data.candidates && data.candidates.length > 0) {
            const candidate = data.candidates[0];
            const lat = candidate.location.y;
            const lng = candidate.location.x;

            setMapPosition([lat, lng]);
          } else {
            console.warn('⚠️ ArcGIS não encontrou resultados.');
          }
        }
      } catch (error) {
        console.error('❌ Erro ao buscar localização:', error);
      } finally {
        setIsLoadingMap(false);
      }
    };

    geocodeAddress();
  }, [isMapOpen, fullAddress, mapPosition, rua, bairro, cidade, uf, numero, result.locationDetails]);

  const IconComponent = iconMap[result.result.icon as keyof typeof iconMap];

  const viabilityScore = result.viabilityScore ?? (
    result.result.type === 'positive' ? 85 :
      result.result.type === 'negative' ? 25 :
        result.result.type === 'inadequate_use' ? 0 :
          result.result.type === 'excessive_use' ? 0 : 50
  );

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="mb-8"
    >
      {/* Container único com resultado em cima e mapa embaixo */}
      <AdvancedCard className="shadow-xl overflow-hidden">
        <div className="flex flex-col">
          {/* Resultado em cima */}
          <div className="p-6 pb-4">
            <div className={`rounded-xl ${result.result.bgColor} dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 p-5 border-2 border-opacity-20 dark:border-opacity-30 ${result.result.color.replace('text-', 'dark:border-')}`}>
              {/* Header compacto com ícone e título */}
              <div className="text-center mb-3">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                  className="mb-3"
                >
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-full ${result.result.bgColor} border-4 border-white dark:border-gray-800 shadow-lg`}>
                    <IconComponent className={`w-7 h-7 ${result.result.color}`} />
                  </div>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className={`text-xl font-bold ${result.result.color} mb-2`}
                >
                  {result.result.title}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed px-2"
                >
                  {result.result.description}
                </motion.p>
              </div>

              {/* Barra de Recomendação compacta */}
              {result.result.type !== 'inadequate_use' && result.result.type !== 'excessive_use' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="mb-3"
                >
                  <RecommendationBar score={viabilityScore} />
                </motion.div>
              )}

              {/* Endereço clicável com dropdown do mapa */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-white dark:bg-gray-800 bg-opacity-80 dark:bg-opacity-80 rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700"
              >
                {/* Header do endereço - clicável */}
                <button
                  onClick={() => setIsMapOpen(!isMapOpen)}
                  className="w-full flex items-center justify-between gap-3 p-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 group"
                >
                  <div className="flex items-center gap-2.5 flex-1 min-w-0">
                    <div className={`p-2 rounded-lg ${isMapOpen ? 'bg-blue-100 dark:bg-blue-900/40' : 'bg-gray-100 dark:bg-gray-700'} transition-colors`}>
                      <MapPin className={`w-4 h-4 ${isMapOpen ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`} />
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 truncate">
                        {hasAddressData ? `${rua}${numero ? `, ${numero}` : ''}` : `CEP: ${cep}`}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {hasAddressData ? `${bairro}${bairro && cidade ? ' - ' : ''}${cidade}${uf ? `/${uf}` : ''}` : 'Endereço sendo processado...'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded-md transition-colors whitespace-nowrap"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      Abrir Maps
                    </a>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      <span>{isMapOpen ? 'Ocultar' : 'Ver'} Mapa</span>
                      {isMapOpen ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </div>
                </button>

                {/* Dropdown do mapa */}
                <AnimatePresence>
                  {isMapOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-3 pt-0" ref={mapContainerRef}>
                        {/* Leaflet Map - Geocoding tradicional com Nominatim */}
                        <div className="rounded-lg overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
                          {isLoadingMap ? (
                            <div className="h-[300px] flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                              <div className="text-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Carregando localização...</p>
                              </div>
                            </div>
                          ) : mapPosition && isClient ? (
                            <MapComponent position={mapPosition} address={fullAddress} />
                          ) : (
                            <div className="h-[300px] flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                              <p className="text-sm text-gray-600 dark:text-gray-400">Não foi possível carregar o mapa</p>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center justify-center gap-2 mt-2.5 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                          <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                            {fullAddress}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Test Count for Excessive Use */}
              {result.result.type === 'excessive_use' && result.testCount && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="mt-3 bg-white dark:bg-gray-800 bg-opacity-50 dark:bg-opacity-50 rounded-lg p-2.5"
                >
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Análises realizadas: <span className="font-semibold">{result.testCount}/{result.maxTests}</span>
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </AdvancedCard>
    </motion.div>
  );
}
