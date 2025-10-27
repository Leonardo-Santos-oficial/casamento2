import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Music, ExternalLink } from 'lucide-react';

interface SpotifyPlaylistProps {
  playlistUrl: string;
  onOpenPlaylist: () => void;
  isLoading?: boolean;
}

export const SpotifyPlaylist = ({ 
  playlistUrl, 
  onOpenPlaylist,
  isLoading = false 
}: SpotifyPlaylistProps) => {
  return (
    <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
      <CardContent className="p-8">
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-lg">
            <Music className="w-10 h-10 text-white" />
          </div>
          
          <h3 className="text-2xl font-bold mb-3 text-foreground">Playlist Colaborativa</h3>
          
          <p className="text-muted-foreground mb-6 max-w-xl leading-relaxed">
            Ajude-nos a criar a trilha sonora perfeita para nossa festa! 
            Adicione suas músicas favoritas à nossa playlist do Spotify e 
            faça parte da celebração.
          </p>

          <div className="space-y-3 w-full max-w-sm">
            <Button 
              onClick={onOpenPlaylist}
              size="lg" 
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              disabled={isLoading}
            >
              <ExternalLink className="mr-2 h-5 w-5" />
              {isLoading ? 'Abrindo Spotify...' : 'Abrir Playlist no Spotify'}
            </Button>
            
            <p className="text-sm text-muted-foreground">
              Contribua com músicas que vão animar nossa festa!
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
