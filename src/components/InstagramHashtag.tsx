import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Instagram, Copy, Camera } from 'lucide-react';
import { useState } from 'react';

interface InstagramHashtagProps {
  hashtag: string;
  onCopyHashtag: () => void;
}

export const InstagramHashtag = ({ hashtag, onCopyHashtag }: InstagramHashtagProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopyHashtag();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-purple-200 dark:border-purple-800">
      <CardContent className="p-8">
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-6 shadow-lg">
            <Instagram className="w-10 h-10 text-white" />
          </div>
          
          <h3 className="text-2xl font-bold mb-3 text-foreground">Compartilhe Conosco</h3>
          
          <p className="text-muted-foreground mb-6 max-w-xl leading-relaxed">
            Queremos ver este momento especial pelos seus olhos! Tire fotos, 
            compartilhe no Instagram e marque com nossa hashtag oficial.
          </p>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-lg mb-6 border-2 border-purple-200 dark:border-purple-800 w-full max-w-md">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Camera className="w-6 h-6 text-purple-500" />
              <span className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                {hashtag}
              </span>
            </div>
            
            <Button 
              onClick={handleCopy}
              variant={copied ? "default" : "outline"}
              className="w-full"
            >
              <Copy className="mr-2 h-4 w-4" />
              {copied ? 'Hashtag Copiada!' : 'Copiar Hashtag'}
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-muted-foreground max-w-2xl">
            <div className="flex flex-col items-center p-4 bg-white/50 dark:bg-slate-900/50 rounded-lg">
              <span className="text-2xl mb-2">📸</span>
              <p className="font-medium">Tire fotos</p>
            </div>
            <div className="flex flex-col items-center p-4 bg-white/50 dark:bg-slate-900/50 rounded-lg">
              <span className="text-2xl mb-2">📱</span>
              <p className="font-medium">Poste no Instagram</p>
            </div>
            <div className="flex flex-col items-center p-4 bg-white/50 dark:bg-slate-900/50 rounded-lg">
              <span className="text-2xl mb-2">💜</span>
              <p className="font-medium">Use a hashtag</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
