"use client";

import React, { useState, useMemo, useEffect } from "react";
import { EnneaDataDock } from "./EnneaDataDock";
import { EnneaSceneCanvas } from "./EnneaSceneCanvas";
import { EnneaVenueRibbon } from "./EnneaVenueRibbon";
import {
  ArtronEnneaEcosystemProps,
  EnneaRegion,
  EnneaStrings,
  EnneaVenue,
  ViewMode,
} from "./types";
import { useLanguage } from "@/context/LanguageContext";

const DEFAULT_REGIONS: EnneaRegion[] = [
  { id: "tbilisi", name: "Tbilisi Hub", shapeNames: ["Tbilisi"], city: "Tbilisi", live: true },
  { id: "imereti", name: "Imereti / Kutaisi Hub", shapeNames: ["Imereti"], city: "Kutaisi", live: true },
];

const DEFAULT_VENUES: EnneaVenue[] = [
  {
    id: "x-area",
    name: "X AREA GYM",
    regionId: "imereti",
    category: "Premium Club",
    city: "Kutaisi",
    regionName: "იმერეთი",
    regionCity: "ქუთაისი",
    lat: 42.2665,
    lon: 42.6945,
    accent: "#00A3FF",
    members: "11,000+",
    status: "VERIFIED VENUE // ARTRON NETWORK",
    workingHours: {
      monSat: "Mon – Sat: 08:00 – 23:00",
      sun: "Sun: 09:00 – 21:00",
      weekdayOpen: 8,
      weekdayClose: 23,
      weekendOpen: 9,
      weekendClose: 21,
    },
  },
  {
    id: "flex",
    name: "Flex Fitness",
    regionId: "imereti",
    category: "Premium Club",
    city: "Kutaisi",
    regionName: "იმერეთი",
    regionCity: "ქუთაისი",
    lat: 42.2550,
    lon: 42.7020,
    accent: "#00A3FF",
    members: "3,000+",
    status: "VERIFIED VENUE // ARTRON NETWORK",
    workingHours: {
      monSat: "Mon – Sat: 08:30 – 22:30",
      sun: "Sun: 10:00 – 20:00",
      weekdayOpen: 8.5,
      weekdayClose: 22.5,
      weekendOpen: 10,
      weekendClose: 20,
    },
  },
  {
    id: "pixl",
    name: "PIXL Fitness",
    regionId: "imereti",
    category: "Functional Gym",
    city: "Kutaisi",
    regionName: "იმერეთი",
    regionCity: "ქუთაისი",
    lat: 42.2580,
    lon: 42.7100,
    accent: "#00A3FF",
    members: "2,800+",
    status: "VERIFIED VENUE // ARTRON NETWORK",
    workingHours: {
      monSat: "Mon – Sat: 09:00 – 23:00",
      sun: "Sun: 10:00 – 21:00",
      weekdayOpen: 9,
      weekdayClose: 23,
      weekendOpen: 10,
      weekendClose: 21,
    },
  },
  {
    id: "zona-15",
    name: "Fitness Zona 15",
    regionId: "imereti",
    category: "Functional Gym",
    city: "Terjola",
    regionName: "იმერეთი",
    regionCity: "თერჯოლა",
    lat: 42.1780,
    lon: 43.0130,
    accent: "#00A3FF",
    members: "1,400+",
    status: "VERIFIED VENUE // ARTRON NETWORK",
    workingHours: {
      monSat: "Mon – Sat: 09:00 – 22:00",
      sun: "Sun: 10:00 – 20:00",
      weekdayOpen: 9,
      weekdayClose: 22,
      weekendOpen: 10,
      weekendClose: 20,
    },
  },
  {
    id: "athletic",
    name: "Athletic.ათლეტიკი",
    regionId: "imereti",
    category: "Performance Gym",
    city: "Kutaisi",
    regionName: "იმერეთი",
    regionCity: "ქუთაისი",
    lat: 42.2471,
    lon: 42.6693,
    accent: "#00A3FF",
    members: "840+",
    status: "VERIFIED VENUE // ARTRON NETWORK",
    workingHours: {
      monSat: "Mon – Sat: 08:30 – 22:00",
      sun: "Sun: 10:00 – 19:00",
      weekdayOpen: 8.5,
      weekdayClose: 22,
      weekendOpen: 10,
      weekendClose: 19,
    },
  },
  {
    id: "fencing-federation",
    name: "საქართველოს ფარიკაობის ფედერაცია",
    regionId: "tbilisi",
    category: "Federation",
    city: "Tbilisi",
    regionName: "თბილისი",
    regionCity: "თბილისი",
    lat: 41.7151,
    lon: 44.8271,
    accent: "#00A3FF",
    members: "—",
    status: "VERIFIED FEDERATION // ARTRON NETWORK",
    logoSrc: "/logo/client logo/fencing-federation.png",
    workingHours: {
      monSat: "Mon – Fri: 09:00 – 20:00, Sat: 10:00 – 18:00",
      sun: "Sun: Closed",
      weekdayOpen: 9,
      weekdayClose: 20,
      weekendOpen: 10,
      weekendClose: 18,
      isSunClosed: true,
    },
  },
];

export const ArtronEnneaEcosystem: React.FC<ArtronEnneaEcosystemProps> = ({
  regions: propRegions,
  venues: propVenues,
  accent = "#7FD4FF",
  adm1Url = "/geo/georgia-adm1.json",
  className = "",
  onViewModeChange,
  onVenueSelect,
}) => {
  const { locale } = useLanguage();
  const isKa = locale === "ka";
  const isRu = locale === "ru";

  const regions = useMemo<EnneaRegion[]>(() => {
    if (propRegions && propRegions.length > 0) return propRegions;
    if (isRu) {
      return [
        { id: "tbilisi", name: "Тбилисский хаб", shapeNames: ["Tbilisi"], city: "Тбилиси", live: true },
        { id: "imereti", name: "Имеретинский / Кутаисский хаб", shapeNames: ["Imereti"], city: "Кутаиси", live: true },
      ];
    }
    if (isKa) {
      return [
        { id: "tbilisi", name: "თბილისის ჰაბი", shapeNames: ["Tbilisi"], city: "თბილისი", live: true },
        { id: "imereti", name: "იმერეთის / ქუთაისის ჰაბი", shapeNames: ["Imereti"], city: "ქუთაისი", live: true },
      ];
    }
    return [
      { id: "tbilisi", name: "Tbilisi Hub", shapeNames: ["Tbilisi"], city: "Tbilisi", live: true },
      { id: "imereti", name: "Imereti / Kutaisi Hub", shapeNames: ["Imereti"], city: "Kutaisi", live: true },
    ];
  }, [propRegions, isKa, isRu]);

  const defaultVenuesList = useMemo<EnneaVenue[]>(() => {
    return [
      {
        id: "x-area",
        name: "X AREA GYM",
        regionId: "imereti",
        category: isKa ? "პრემიუმ კლუბი" : isRu ? "Премиум клуб" : "Premium Club",
        city: isKa ? "ქუთაისი" : isRu ? "Кутаиси" : "Kutaisi",
        regionName: isKa ? "იმერეთი" : isRu ? "Имерети" : "Imereti",
        regionCity: isKa ? "ქუთაისი" : isRu ? "Кутаиси" : "Kutaisi",
        lat: 42.2665,
        lon: 42.6945,
        accent: "#00A3FF",
        members: "11,000+",
        status: isKa ? "ავტორიზებული დარბაზი // ართრონის ქსელი" : isRu ? "АВТОРИЗОВАННЫЙ КЛУБ // СЕТЬ ARTRON" : "VERIFIED VENUE // ARTRON NETWORK",
        turnstile: isKa ? "IoT ტურნიკეტები" : isRu ? "IoT турникеты" : "IoT Turnstiles",
        gateway: isKa ? "საქართველოს ბანკი 1-Click გადახდა" : isRu ? "Bank of Georgia 1-Click шлюз" : "Bank of Georgia 1-Click Gateway",
        workingHours: {
          monSat: isKa ? "ორშ – შაბ: 08:00 – 23:00" : isRu ? "Пн – Сб: 08:00 – 23:00" : "Mon – Sat: 08:00 – 23:00",
          sun: isKa ? "კვირა: 09:00 – 21:00" : isRu ? "Вс: 09:00 – 21:00" : "Sun: 09:00 – 21:00",
          weekdayOpen: 8,
          weekdayClose: 23,
          weekendOpen: 9,
          weekendClose: 21,
        },
      },
      {
        id: "flex",
        name: "Flex Fitness",
        regionId: "imereti",
        category: isKa ? "პრემიუმ კლუბი" : isRu ? "Премиум клуб" : "Premium Club",
        city: isKa ? "ქუთაისი" : isRu ? "Кутаиси" : "Kutaisi",
        regionName: isKa ? "იმერეთი" : isRu ? "Имерети" : "Imereti",
        regionCity: isKa ? "ქუთაისი" : isRu ? "Кутаиси" : "Kutaisi",
        lat: 42.2550,
        lon: 42.7020,
        accent: "#00A3FF",
        members: "3,000+",
        status: isKa ? "ავტორიზებული დარბაზი // ართრონის ქსელი" : isRu ? "АВТОРИЗОВАННЫЙ КЛУБ // СЕТЬ ARTRON" : "VERIFIED VENUE // ARTRON NETWORK",
        turnstile: isKa ? "IoT ტურნიკეტები" : isRu ? "IoT турникеты" : "IoT Turnstiles",
        gateway: isKa ? "საქართველოს ბანკი 1-Click გადახდა" : isRu ? "Bank of Georgia 1-Click шлюз" : "Bank of Georgia 1-Click Gateway",
        workingHours: {
          monSat: isKa ? "ორშ – შაბ: 08:30 – 22:30" : isRu ? "Пн – Сб: 08:30 – 22:30" : "Mon – Sat: 08:30 – 22:30",
          sun: isKa ? "კვირა: 10:00 – 20:00" : isRu ? "Вс: 10:00 – 20:00" : "Sun: 10:00 – 20:00",
          weekdayOpen: 8.5,
          weekdayClose: 22.5,
          weekendOpen: 10,
          weekendClose: 20,
        },
      },
      {
        id: "pixl",
        name: "PIXL Fitness",
        regionId: "imereti",
        category: isKa ? "ფუნქციური დარბაზი" : isRu ? "Функциональный зал" : "Functional Gym",
        city: isKa ? "ქუთაისი" : isRu ? "Кутаиси" : "Kutaisi",
        regionName: isKa ? "იმერეთი" : isRu ? "Имерети" : "Imereti",
        regionCity: isKa ? "ქუთაისი" : isRu ? "Кутаиси" : "Kutaisi",
        lat: 42.2580,
        lon: 42.7100,
        accent: "#00A3FF",
        members: "2,800+",
        status: isKa ? "ავტორიზებული დარბაზი // ართრონის ქსელი" : isRu ? "АВТОРИЗОВАННЫЙ КЛУБ // СЕТЬ ARTRON" : "VERIFIED VENUE // ARTRON NETWORK",
        turnstile: isKa ? "IoT ტურნიკეტები" : isRu ? "IoT турникеты" : "IoT Turnstiles",
        gateway: isKa ? "საქართველოს ბანკი 1-Click გადახდა" : isRu ? "Bank of Georgia 1-Click шлюз" : "Bank of Georgia 1-Click Gateway",
        workingHours: {
          monSat: isKa ? "ორშ – შაბ: 09:00 – 23:00" : isRu ? "Пн – Сб: 09:00 – 23:00" : "Mon – Sat: 09:00 – 23:00",
          sun: isKa ? "კვირა: 10:00 – 21:00" : isRu ? "Вс: 10:00 – 21:00" : "Sun: 10:00 – 21:00",
          weekdayOpen: 9,
          weekdayClose: 23,
          weekendOpen: 10,
          weekendClose: 21,
        },
      },
      {
        id: "zona-15",
        name: "Fitness Zona 15",
        regionId: "imereti",
        category: isKa ? "ფუნქციური დარბაზი" : isRu ? "Функциональный зал" : "Functional Gym",
        city: isKa ? "თერჯოლა" : isRu ? "Тержола" : "Terjola",
        regionName: isKa ? "იმერეთი" : isRu ? "Имерети" : "Imereti",
        regionCity: isKa ? "თერჯოლა" : isRu ? "Тержола" : "Terjola",
        lat: 42.1780,
        lon: 43.0130,
        accent: "#00A3FF",
        members: "1,400+",
        status: isKa ? "ავტორიზებული დარბაზი // ართრონის ქსელი" : isRu ? "АВТОРИЗОВАННЫЙ КЛУБ // СЕТЬ ARTRON" : "VERIFIED VENUE // ARTRON NETWORK",
        turnstile: isKa ? "IoT ტურნიკეტები" : isRu ? "IoT турникеты" : "IoT Turnstiles",
        gateway: isKa ? "საქართველოს ბანკი 1-Click გადახდა" : isRu ? "Bank of Georgia 1-Click шлюз" : "Bank of Georgia 1-Click Gateway",
        workingHours: {
          monSat: isKa ? "ორშ – შაბ: 09:00 – 22:00" : isRu ? "Пн – Сб: 09:00 – 22:00" : "Mon – Sat: 09:00 – 22:00",
          sun: isKa ? "კვირა: 10:00 – 20:00" : isRu ? "Вс: 10:00 – 20:00" : "Sun: 10:00 – 20:00",
          weekdayOpen: 9,
          weekdayClose: 22,
          weekendOpen: 10,
          weekendClose: 20,
        },
      },
      {
        id: "athletic",
        name: "Athletic.ათლეტიკი",
        regionId: "imereti",
        category: isKa ? "სავარჯიშო დარბაზი" : isRu ? "Силовой зал" : "Performance Gym",
        city: isKa ? "ქუთაისი" : isRu ? "Кутаиси" : "Kutaisi",
        regionName: isKa ? "იმერეთი" : isRu ? "Имерети" : "Imereti",
        regionCity: isKa ? "ქუთაისი" : isRu ? "Кутаиси" : "Kutaisi",
        lat: 42.2471,
        lon: 42.6693,
        accent: "#00A3FF",
        members: "840+",
        status: isKa ? "ავტორიზებული დარბაზი // ართრონის ქსელი" : isRu ? "АВТОРИЗОВАННЫЙ КЛУБ // СЕТЬ ARTRON" : "VERIFIED VENUE // ARTRON NETWORK",
        turnstile: isKa ? "IoT ტურნიკეტები" : isRu ? "IoT турникеты" : "IoT Turnstiles",
        gateway: isKa ? "საქართველოს ბანკი 1-Click გადახდა" : isRu ? "Bank of Georgia 1-Click шлюз" : "Bank of Georgia 1-Click Gateway",
        workingHours: {
          monSat: isKa ? "ორშ – შაბ: 08:30 – 22:00" : isRu ? "Пн – Сб: 08:30 – 22:00" : "Mon – Sat: 08:30 – 22:00",
          sun: isKa ? "კვირა: 10:00 – 19:00" : isRu ? "Вс: 10:00 – 19:00" : "Sun: 10:00 – 19:00",
          weekdayOpen: 8.5,
          weekdayClose: 22,
          weekendOpen: 10,
          weekendClose: 19,
        },
      },
      {
        id: "fencing-federation",
        name: isKa ? "საქართველოს ფარიკაობის ფედერაცია" : isRu ? "Федерация фехтования Грузии" : "Georgian Fencing Federation",
        regionId: "tbilisi",
        category: isKa ? "ფედერაცია" : isRu ? "Федерация" : "Federation",
        city: isKa ? "თბილისი" : isRu ? "Тбилиси" : "Tbilisi",
        regionName: isKa ? "თბილისი" : isRu ? "Тбилиси" : "Tbilisi",
        regionCity: isKa ? "თბილისი" : isRu ? "Тбилиси" : "Tbilisi",
        lat: 41.7151,
        lon: 44.8271,
        accent: "#00A3FF",
        members: "—",
        status: isKa ? "ავტორიზებული ფედერაცია // ართრონის ქსელი" : isRu ? "АВТОРИЗОВАННАЯ ФЕДЕРАЦИЯ // СЕТЬ ARTRON" : "VERIFIED FEDERATION // ARTRON NETWORK",
        turnstile: isKa ? "IoT ტურნიკეტები" : isRu ? "IoT турникеты" : "IoT Turnstiles",
        gateway: isKa ? "საქართველოს ბანკი 1-Click გადახდა" : isRu ? "Bank of Georgia 1-Click шлюз" : "Bank of Georgia 1-Click Gateway",
        logoSrc: "/logo/client logo/fencing-federation.png",
        workingHours: {
          monSat: isKa ? "ორშ – პარ: 09:00 – 20:00, შაბ: 10:00 – 18:00" : isRu ? "Пн – Пт: 09:00 – 20:00, Сб: 10:00 – 18:00" : "Mon – Fri: 09:00 – 20:00, Sat: 10:00 – 18:00",
          sun: isKa ? "კვირა: დასვენება" : isRu ? "Вс: Выходной" : "Sun: Closed",
          weekdayOpen: 9,
          weekdayClose: 20,
          weekendOpen: 10,
          weekendClose: 18,
          isSunClosed: true,
        },
      },
      {
        id: "bog",
        name: "Bank of Georgia",
        regionId: "tbilisi",
        category: isKa ? "სტრატეგიული ფინტექ პარტნიორი" : isRu ? "Стратегический финтех-партнер" : "Strategic FinTech Partner",
        city: isKa ? "თბილისი" : isRu ? "Тбилиси" : "Tbilisi",
        regionName: isKa ? "თბილისი" : isRu ? "Тбилиси" : "Tbilisi",
        regionCity: isKa ? "თბილისი" : isRu ? "Тбилиси" : "Tbilisi",
        lat: 41.7270,
        lon: 44.7730,
        accent: "#FF5E00",
        members: "1-Click iPAY",
        status: isKa ? "სტრატეგიული ფინტექი // აქტიური" : isRu ? "СТРАТЕГИЧЕСКИЙ ФИНТЕХ // АКТИВНО" : "STRATEGIC FINTECH // ACTIVE",
        turnstile: isKa ? "iPAY ცენტრალური API" : isRu ? "iPAY Центральный API" : "iPAY Central API",
        gateway: isKa ? "Apple Pay · Google Pay · 0% განვადება" : isRu ? "Apple Pay · Google Pay · 0% рассрочка" : "Apple Pay · Google Pay · 0% Installments",
        isPartner: true,
        workingHours: {
          monSat: isKa ? "ორშ – პარ: 10:00 – 18:00" : isRu ? "Пн – Пт: 10:00 – 18:00" : "Mon – Fri: 10:00 – 18:00",
          sun: isKa ? "შაბ – კვ: ონლაინ სერვისები" : isRu ? "Сб – Вс: Онлайн-сервисы" : "Sat – Sun: Online Services",
          weekdayOpen: 10,
          weekdayClose: 18,
          weekendOpen: 0,
          weekendClose: 24,
        },
      },
    ];
  }, [isKa, isRu]);

  const activeVenues = propVenues && propVenues.length > 0 ? propVenues : defaultVenuesList;

  const [viewMode, setViewMode] = useState<ViewMode>("GLOBE");
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedVenue, setSelectedVenue] = useState<EnneaVenue | null>(null);
  const [activeTab, setActiveTab] = useState<"venues" | "partners">("venues");
  const [isDockCollapsed, setIsDockCollapsed] = useState<boolean>(false);

  // Equal Representation Shuffle for client gyms
  const [shuffledVenues, setShuffledVenues] = useState<EnneaVenue[]>(activeVenues);
  useEffect(() => {
    const clients = activeVenues.filter((v) => !v.isPartner);
    const partners = activeVenues.filter((v) => v.isPartner);
    const shuffledClients = [...clients].sort(() => Math.random() - 0.5);
    setShuffledVenues([...shuffledClients, ...partners]);
  }, [activeVenues]);

  const strings = useMemo<EnneaStrings>(() => {
    if (locale === "ru") {
      return {
        kicker: "ARTRON NETWORK // ЭКОСИСТЕМА",
        title: "Партнеры и клубы-клиенты",
        subtitle: "Интегрированная сеть спортивных объектов и финтех-шлюзов Грузии.",
        breadcrumbWorld: "Мир",
        breadcrumbCountry: "Грузия",
        backToWorld: "← Назад к миру",
        exploreGeorgia: "ОБЗОР ГРУЗИИ",
        filters: { all: "Все", venues: "Залы", fintech: "Финтех & IoT" },
        badgeTitle: "GEORGIA // ACTIVE CORE",
        badgeCoords: "41.7°N / 44.8°E · LIVE NETWORK",
        hint: "Вращайте шар · Прокрутите для зума",
        hintDetail: "Кликните на пин для деталей",
        zoomIn: "Приблизить",
        zoomOut: "Отдалить",
        resetView: "Сброс вида",
        soundOn: "ЗВУК: ВКЛ",
        soundOff: "ЗВУК: ВЫКЛ",
        regionsLabel: "АКТИВНЫЕ ХАБЫ",
        venuesLabel: "ДЕЙСТВУЮЩИЕ ЗАЛЫ",
        membersLabel: "ВМЕСТИМОСТЬ ЧЛЕНОВ",
        techLabel: "ИНТЕГРИРОВАННЫЕ ТЕХНОЛОГИИ",
        loadingMap: "ЗАГРУЗКА ADM1 ВЕКТОРОВ…",
        mapError: "ИСТОЧНИК ВЕКТОРОВ НЕДОСТУПЕН",
        close: "Закрыть",
        liveBadge: "АВТОРИЗОВАННЫЙ ОБЪЕКТ",
        backToList: "← Назад к списку",
        allHubs: "Все хабы",
        venueList: "Список залов",
        siteLink: "+ Сайт объекта",
        allCities: "Все города",
        cityFilter: "Фильтр по городам",
        searchPlaceholder: "Поиск: зал, город...",
        notFound: "Объекты не найдены",
        networkStatus: "Рабочий статус",
        venuesTab: "Клубы-клиенты",
        partnersTab: "Партнеры",
        partnerBadge: "ПАРТНЕРЫ И ЭКОСИСТЕМА",
        showOnMap: "Показать на карте",
        workingHoursTitle: "Часы работы",
        openNow: "Открыто сейчас",
        closedNow: "Закрыто сейчас",
        closesAt: "Закрывается в",
        opensAt: "Открывается в",
        monSatLabel: "Пн – Сб",
        sunLabel: "Воскресенье",
        closedLabel: "Выходной",
        verifiedVenue: "Авторизованный клуб",
        stats: {
          hubs: "Хабы",
          venues: "Залы",
          members: "Участники",
          integration: "Интеграция",
          access: "Доступ",
          status: "Статус",
          acquiring: "Эквайринг",
          installments: "Рассрочка",
        },
      };
    }

    if (locale === "en") {
      return {
        kicker: "ARTRON NETWORK // ECOSYSTEM",
        title: "Partners & Client Fitness Clubs",
        subtitle: "Integrated network of leading sports venues and FinTech gateways across Georgia.",
        breadcrumbWorld: "World",
        breadcrumbCountry: "Georgia",
        backToWorld: "← Back to World",
        exploreGeorgia: "EXPLORE GEORGIA",
        filters: { all: "All", venues: "Venues", fintech: "FinTech & IoT" },
        badgeTitle: "GEORGIA // ACTIVE CORE",
        badgeCoords: "41.7°N / 44.8°E · LIVE NETWORK",
        hint: "Drag to orbit · Scroll to zoom",
        hintDetail: "Click a pin to inspect telemetry",
        zoomIn: "Zoom In",
        zoomOut: "Zoom Out",
        resetView: "Reset View",
        soundOn: "AUDIO: ON",
        soundOff: "AUDIO: OFF",
        regionsLabel: "ACTIVE HUBS",
        venuesLabel: "LIVE VENUES",
        membersLabel: "MEMBER CAPACITY",
        techLabel: "INTEGRATED TECH",
        loadingMap: "RESOLVING ADM1 VECTORS…",
        mapError: "ADM1 VECTOR SOURCE UNREACHABLE",
        close: "Close",
        liveBadge: "VERIFIED VENUE",
        backToList: "← Back to List",
        allHubs: "All Hubs",
        venueList: "Venue List",
        siteLink: "+ Venue Website",
        allCities: "All Cities",
        cityFilter: "Filter by City",
        searchPlaceholder: "Search: venue, city...",
        notFound: "No venues found",
        networkStatus: "Operating Status",
        venuesTab: "Client Venues",
        partnersTab: "Partners",
        partnerBadge: "PARTNERS & ECOSYSTEM",
        showOnMap: "Show on Map",
        workingHoursTitle: "Working Hours",
        openNow: "Open Now",
        closedNow: "Closed Now",
        closesAt: "Closes at",
        opensAt: "Opens at",
        monSatLabel: "Mon – Sat",
        sunLabel: "Sunday",
        closedLabel: "Closed",
        verifiedVenue: "Verified Venue",
        stats: {
          hubs: "Hubs",
          venues: "Venues",
          members: "Members",
          integration: "Integration",
          access: "Access",
          status: "Status",
          acquiring: "Acquiring",
          installments: "Installments",
        },
      };
    }

    // Georgian (Default)
    return {
      kicker: "ARTRON NETWORK // ეკოსისტემა",
      title: "პარტნიორები და კლიენტი დარბაზები",
      subtitle: "საქართველოს წამყვანი სპორტული ინფრასტრუქტურის ცენტრალიზებული ქსელი.",
      breadcrumbWorld: "მსოფლიო",
      breadcrumbCountry: "საქართველო",
      backToWorld: "← დაბრუნება მსოფლიოზე",
      exploreGeorgia: "საქართველოს ქსელი",
      filters: { all: "ყველა", venues: "დარბაზები", fintech: "ფინტექი & IoT" },
      badgeTitle: "GEORGIA // ACTIVE CORE",
      badgeCoords: "41.7°N / 44.8°E · LIVE NETWORK",
      hint: "გადაათრიე ორბიტისთვის · სკროლი მასშტაბისთვის",
      hintDetail: "ცოცხალი ობიექტები · 6 · დააჭირე პინს",
      zoomIn: "გადიდება",
      zoomOut: "დაპატარავება",
      resetView: "საწყისი ხედი",
      soundOn: "ხმა: ჩართული",
      soundOff: "ხმა: გამორთული",
      regionsLabel: "აქტიური ჰაბები",
      venuesLabel: "მოქმედი დარბაზები",
      membersLabel: "წევრთა ტევადობა",
      techLabel: "ინტეგრირებული ტექნოლოგია",
      loadingMap: "ADM1 რუკის ჩატვირთვა…",
      mapError: "რუკის ჩატვირთვა ვერ მოხერხდა",
      close: "დახურვა",
      liveBadge: "ავტორიზებული ობიექტი",
      backToList: "← ობიექტების სიაში",
      allHubs: "ყველა ჰაბი",
      venueList: "ობიექტების სია",
      siteLink: "+ ობიექტის საიტი",
      allCities: "ყველა ქალაქი",
      cityFilter: "ქალაქის ფილტრი",
      searchPlaceholder: "ძებნა: დარბაზი, ქალაქი...",
      notFound: "ობიექტი ვერ მოიძებნა",
      networkStatus: "სამუშაო სტატუსი",
      venuesTab: "კლიენტი დარბაზები",
      partnersTab: "პარტნიორები",
      partnerBadge: "პარტნიორები & ეკოსისტემა",
      showOnMap: "რუკაზე ჩვენება",
      workingHoursTitle: "სამუშაო საათები",
      openNow: "ღიაა ახლა",
      closedNow: "დაკეტილია ახლა",
      closesAt: "იკეტება",
      opensAt: "გაიღება",
      monSatLabel: "ორშ – შაბ",
      sunLabel: "კვირა",
      closedLabel: "დასვენება",
      verifiedVenue: "ავტორიზებული დარბაზი",
      stats: {
        hubs: "ჰაბი",
        venues: "დარბაზი",
        members: "წევრი",
        integration: "ინტეგრაცია",
        access: "წვდომა",
        status: "სტატუსი",
        acquiring: "ექვაირინგი",
        installments: "განვადება",
      },
    };
  }, [locale]);

  const handleEnterGeorgia = () => {
    setViewMode("GEORGIA_DETAIL");
    onViewModeChange?.("GEORGIA_DETAIL");
  };

  const handleExitToGlobe = () => {
    setSelectedVenue(null);
    setSelectedRegion(null);
    setViewMode("GLOBE");
    onViewModeChange?.("GLOBE");
    onVenueSelect?.(null);
  };

  const handleSelectRegion = (id: string | null) => {
    setSelectedRegion((cur) => (cur === id ? null : id));
    setSelectedVenue(null);
  };

  const handleSelectVenue = (venue: EnneaVenue | null) => {
    setSelectedVenue(venue);
    if (venue) {
      if (venue.isPartner) {
        setActiveTab("partners");
      } else {
        setActiveTab("venues");
      }
      setSelectedRegion(venue.regionId);
      if (viewMode === "GLOBE") {
        setViewMode("GEORGIA_DETAIL");
        onViewModeChange?.("GEORGIA_DETAIL");
      }
    }
    onVenueSelect?.(venue);
  };

  return (
    <div
      className={`relative w-full rounded-3xl overflow-hidden border border-white/10 bg-[#0A0D12] shadow-[0_24px_70px_rgba(0,0,0,0.85)] flex flex-col md:flex-row items-stretch h-[780px] lg:h-[840px] ${className}`}
    >
      {/* Left Glassmorphic Dock */}
      <EnneaDataDock
        viewMode={viewMode}
        venues={shuffledVenues}
        regions={regions}
        selectedRegion={selectedRegion}
        selectedVenue={selectedVenue}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        t={strings}
        accent={accent}
        onSelectRegion={handleSelectRegion}
        onSelectVenue={handleSelectVenue}
        onEnterGeorgia={handleEnterGeorgia}
        onExitToGlobe={handleExitToGlobe}
        isCollapsed={isDockCollapsed}
        onToggleCollapse={() => setIsDockCollapsed((prev) => !prev)}
      />

      {/* Right WebGL 3D Scene Viewport + Bottom Glassmorphic Ribbon */}
      <div className="relative flex-1 h-full min-w-0 flex flex-col overflow-hidden">
        <EnneaSceneCanvas
          viewMode={viewMode}
          accent={accent}
          regions={regions}
          venues={shuffledVenues}
          t={strings}
          adm1Url={adm1Url}
          onEnterGeorgia={handleEnterGeorgia}
          onExitToGlobe={handleExitToGlobe}
          onSelectRegion={handleSelectRegion}
          onSelectVenue={handleSelectVenue}
          selectedRegion={selectedRegion}
          selectedVenue={selectedVenue}
          activeCore={null}
        />

        {/* Bottom Glassmorphic Ribbon for 1-Click Instant Visibility */}
        <EnneaVenueRibbon
          venues={shuffledVenues}
          selectedVenue={selectedVenue}
          onSelectVenue={handleSelectVenue}
          onSelectPartnerTab={() => {
            const bog = shuffledVenues.find((v) => v.id === "bog");
            if (bog) handleSelectVenue(bog);
            else {
              setSelectedVenue(null);
              setActiveTab("partners");
            }
          }}
          activeTab={activeTab}
          t={strings}
          locale={locale}
        />
      </div>
    </div>
  );
};

export default ArtronEnneaEcosystem;
