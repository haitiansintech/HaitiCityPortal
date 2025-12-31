import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Haiti City Portal';
export const size = {
    width: 32,
    height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 20,
                    background: '#0284c7',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    borderRadius: '20%',
                    fontWeight: 'bold',
                }}
            >
                HT
            </div>
        ),
        {
            ...size,
        }
    );
}
