import { ImageResponse } from 'next/og';

export const alt = 'CCC Guide — an open-source guide for the Canadian Computing Competition';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0b0b0f',
          color: '#ededf2',
          padding: 72,
        }}
      >
        <div style={{ display: 'flex', fontSize: 30, color: '#8b8b96' }}>$ man ccc-guide</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div style={{ display: 'flex', fontSize: 110, fontWeight: 700, letterSpacing: -3 }}>
            CCC Guide.
          </div>
          <div style={{ display: 'flex', fontSize: 44, color: '#a8a8b3' }}>
            Learn. Practice. Compete.
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', fontSize: 32, color: '#5c5c66' }}>
            Canadian Computing Competition
          </div>
          <div style={{ display: 'flex', fontSize: 32, color: '#3b82f6' }}>cccguide.net</div>
        </div>
      </div>
    ),
    size
  );
}
