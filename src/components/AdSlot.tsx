'use client';

interface AdSlotProps {
  position: 'top' | 'middle' | 'bottom' | 'sidebar';
  className?: string;
}

export default function AdSlot({ position, className = '' }: AdSlotProps) {
  return (
    <div
      className={`bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center ${className}`}
      style={{
        minHeight: position === 'sidebar' ? '600px' : '250px'
      }}
    >
      <div className="text-center p-8">
        <p className="text-gray-500 font-medium mb-2">
          📢 Espaço para Anúncio - {position.toUpperCase()}
        </p>
        <p className="text-sm text-gray-400">
          {/* AD_SCRIPT_HERE_{position.toUpperCase()} */}
          {/* Insira seu script de ads (Google AdSense, etc) aqui */}
        </p>
        <code className="text-xs bg-gray-200 px-2 py-1 rounded mt-2 inline-block">
          Position: {position}
        </code>
      </div>
    </div>
  );
}

/*
INSTRUÇÕES PARA ADICIONAR SCRIPTS DE ADS:

1. Google AdSense:
   Substitua o comentário acima por:
   <ins className="adsbygoogle"
        style={{display:'block'}}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot="XXXXXXXXXX"
        data-ad-format="auto"
        data-full-width-responsive="true"></ins>

   E adicione no useEffect:
   useEffect(() => {
     try {
       (window.adsbygoogle = window.adsbygoogle || []).push({});
     } catch (err) {
       console.error(err);
     }
   }, []);

2. Outros scripts de ads:
   Simplesmente cole o código fornecido pela rede de anúncios
   no lugar do comentário AD_SCRIPT_HERE
*/
