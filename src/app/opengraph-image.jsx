import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

export const alt = 'CCC Guide — an open-source guide for the Canadian Computing Competition';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const paper = '#f6efe3';
const ink = '#202831';
const slate = '#304457';
const grid = '#4c6073';

const fontDirectory = join(process.cwd(), 'node_modules', 'katex', 'dist', 'fonts');
const [serif, wordmark] = await Promise.all([
  readFile(join(fontDirectory, 'KaTeX_Main-Regular.ttf')),
  readFile(join(process.cwd(), 'public', 'cccguide-wordmark.svg'), 'base64'),
]);

function EmblemPanel() {
  const gridLines = [48, 96, 144, 192, 240];

  return (
    <div style={{ display: 'flex', width: 408, height: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: slate }}>
      <div style={{ display: 'flex', position: 'relative', width: 289, height: 289, border: `1px solid ${grid}`, alignItems: 'center', justifyContent: 'center' }}>
        {gridLines.map((offset) => (
          <div key={`column-${offset}`} style={{ position: 'absolute', left: offset, top: 0, width: 1, height: 288, backgroundColor: grid }} />
        ))}
        {gridLines.map((offset) => (
          <div key={`row-${offset}`} style={{ position: 'absolute', left: 0, top: offset, width: 288, height: 1, backgroundColor: grid }} />
        ))}
        <div style={{ display: 'flex', position: 'relative', width: 216, height: 164, overflow: 'hidden' }}>
          <div style={{ position: 'absolute', left: 0, width: 164, height: 164, border: `2px solid ${paper}`, borderRadius: 82, backgroundColor: slate }} />
          <div style={{ position: 'absolute', left: 67, width: 164, height: 164, border: `2px solid ${paper}`, borderRadius: 82, backgroundColor: slate }} />
          <div style={{ position: 'absolute', left: 134, width: 82, height: 164, borderTopLeftRadius: 82, borderBottomLeftRadius: 82, backgroundColor: paper }} />
        </div>
      </div>
    </div>
  );
}

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ display: 'flex', width: '100%', height: '100%', backgroundColor: paper, color: ink }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: 792, padding: '58px 66px 55px' }}>
          <div style={{ display: 'flex', fontSize: 21, letterSpacing: 3, fontWeight: 700, color: slate }}>
            OPEN-SOURCE STUDY GUIDE
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 19 }}>
            <div style={{ display: 'flex', alignItems: 'center', height: 128 }}>
              {/* ImageResponse renders this public asset from disk. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`data:image/svg+xml;base64,${wordmark}`} alt="CCCGuide" width={566} height={95} />
            </div>
            <div style={{ display: 'flex', fontSize: 35, letterSpacing: -0.65 }}>
              Canadian Computing Competition
            </div>
          </div>

          <div style={{ display: 'flex', borderTop: '1px solid #c4c5c1', paddingTop: 21, fontSize: 24, color: slate }}>
            cccguide.net
          </div>
        </div>
        <EmblemPanel />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Computer Modern', data: serif, weight: 400, style: 'normal' },
      ],
    },
  );
}
