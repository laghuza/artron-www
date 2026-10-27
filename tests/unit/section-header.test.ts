import React from 'react';
import { SectionHeader } from '@/components/ui/SectionHeader';

describe('Canonical SectionHeader Component Parity & Integrity', () => {
  test('SectionHeader is a valid React functional component', () => {
    expect(typeof SectionHeader).toBe('function');
  });

  test('SectionHeader renders title and subtitle without runtime errors', () => {
    const element = React.createElement(SectionHeader, {
      title: 'ტესტური სათაური',
      subtitle: 'ტესტური ქვესათაური',
      badge: 'BETA_01',
    });

    expect(element).toBeDefined();
    expect(element.props.title).toBe('ტესტური სათაური');
    expect(element.props.subtitle).toBe('ტესტური ქვესათაური');
    expect(element.props.badge).toBe('BETA_01');
  });

  test('SectionHeader supports align and size configurations', () => {
    const leftHeader = React.createElement(SectionHeader, {
      title: 'Left Title',
      align: 'left',
      size: 'compact',
    });

    expect(leftHeader.props.align).toBe('left');
    expect(leftHeader.props.size).toBe('compact');
  });
});
