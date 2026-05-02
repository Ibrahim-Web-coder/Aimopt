export default function SectionDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div className={`relative h-px w-full overflow-visible ${flip ? 'rotate-180' : ''}`}>
      <div
        style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,43,43,0.2) 20%, rgba(255,43,43,0.6) 50%, rgba(255,43,43,0.2) 80%, transparent 100%)',
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full text-center"
        style={{
          background: '#ff2b2b',
          boxShadow: '0 0 10px rgba(255,43,43,1), 0 0 20px rgba(255,43,43,0.5)',
        }}
      />
    </div>
  );
}
