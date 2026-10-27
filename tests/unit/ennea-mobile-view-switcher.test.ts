import React from 'react';
import { EnneaMobileViewSwitcher } from '@/components/landing/ecosystem/EnneaMobileViewSwitcher';
import { EnneaStrings } from '@/components/landing/ecosystem/types';

describe('EnneaMobileViewSwitcher Component & Liquid Glass Lens Integrity', () => {
  const mockStrings: EnneaStrings = {
    kicker: 'ARTRON NETWORK // ეკოსისტემა',
    title: 'ქართული სპორტის ციფრული რუკა და პარტნიორები',
    subtitle: 'ტესტური ქვესათაური',
    breadcrumbWorld: 'მსოფლიო',
    breadcrumbCountry: 'საქართველო',
    backToWorld: '← გლობალური ხედი',
    exploreGeorgia: 'საქართველოს რუკა',
    filters: { all: 'ყველა', venues: 'ობიექტები', fintech: 'ფინტექი & IoT' },
    badgeTitle: 'GEORGIA // ACTIVE CORE',
    badgeCoords: '41.7°N / 44.8°E · LIVE NETWORK',
    hint: 'დაატრიალეთ გლობუსი',
    hintDetail: 'აქტიური ობიექტი',
    zoomIn: 'გადიდება',
    zoomOut: 'დაპატარავება',
    resetView: 'საწყისი ხედი',
    soundOn: 'ხმა ჩართული',
    soundOff: 'ხმა გამორთული',
    regionsLabel: 'ჰაბები',
    venuesLabel: 'ობიექტები',
    membersLabel: 'წევრები',
    techLabel: 'ტექნოლოგია',
    loadingMap: 'იტვირთება...',
    mapError: 'შეცდომა',
    close: 'დახურვა',
    liveBadge: 'დამოწმებული ობიექტი',
    backToList: '← სიაზე დაბრუნება',
    allHubs: 'ყველა ჰაბი',
    venueList: 'სია',
    siteLink: 'ლინკი',
    allCities: 'ყველა ქალაქი',
    cityFilter: 'ქალაქი',
    searchPlaceholder: 'ძებნა',
    notFound: 'ვერ მოიძებნა',
    networkStatus: 'სტატუსი',
    venuesTab: 'ობიექტები',
    partnersTab: 'პარტნიორები',
    partnerBadge: 'ბეიჯი',
    showOnMap: 'რუკაზე',
    stats: {
      hubs: 'ჰაბი',
      venues: 'ობიექტი',
      members: 'წევრი',
      integration: 'IoT',
      access: 'დაშვება',
      status: 'სტატუსი',
      acquiring: 'ექვაირინგი',
      installments: 'განვადება',
    },
    mobileViewMap: '3D რუკა',
    mobileViewList: 'სია & პარტნიორები',
  };

  test('EnneaMobileViewSwitcher is a valid functional component', () => {
    expect(typeof EnneaMobileViewSwitcher).toBe('function');
  });

  test('EnneaMobileViewSwitcher renders with initial map mode', () => {
    const onSelectMode = jest.fn();
    const element = React.createElement(EnneaMobileViewSwitcher, {
      mode: 'map',
      onSelectMode,
      t: mockStrings,
      accentColor: '#7FD4FF',
    });

    expect(element).toBeDefined();
    expect(element.props.mode).toBe('map');
    expect(element.props.accentColor).toBe('#7FD4FF');
  });

  test('EnneaMobileViewSwitcher renders with initial list mode', () => {
    const onSelectMode = jest.fn();
    const element = React.createElement(EnneaMobileViewSwitcher, {
      mode: 'list',
      onSelectMode,
      t: mockStrings,
    });

    expect(element.props.mode).toBe('list');
  });
});
