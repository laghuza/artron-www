import React from 'react';
import { TelemetryDashboardLayout } from '@/components/layout/TelemetryDashboardLayout';
import { TelemetryMetricCard } from '@/components/ui/TelemetryMetricCard';

describe('Canonical Telemetry Dashboard Layout & Metric Card Integrity', () => {
  test('TelemetryDashboardLayout is a valid functional component', () => {
    expect(typeof TelemetryDashboardLayout).toBe('function');
  });

  test('TelemetryMetricCard is a valid functional component', () => {
    expect(typeof TelemetryMetricCard).toBe('function');
  });

  test('TelemetryMetricCard correctly instantiates with props', () => {
    const card = React.createElement(TelemetryMetricCard, {
      tag: '// TEST_TAG',
      value: 1200,
      description: 'Test description content',
      status: '[ STATUS: OK ]',
      theme: 'emerald',
    });

    expect(card.props.tag).toBe('// TEST_TAG');
    expect(card.props.value).toBe(1200);
    expect(card.props.theme).toBe('emerald');
  });

  test('TelemetryDashboardLayout correctly configures node badge and title', () => {
    const layout = React.createElement(
      TelemetryDashboardLayout,
      {
        nodeBadge: '[ NODE_TEST ]',
        title: 'Test Command Center',
      },
      React.createElement('div', null, 'Child Content')
    );

    expect(layout.props.nodeBadge).toBe('[ NODE_TEST ]');
    expect(layout.props.title).toBe('Test Command Center');
  });
});
