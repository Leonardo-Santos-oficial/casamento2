import { useCountdown } from '@/hooks/use-countdown';
import { Card, CardContent } from '@/components/ui/card';

interface CountdownTimerProps {
  targetDate: Date;
}

interface TimeUnitProps {
  value: number;
  label: string;
}

const TimeUnit = ({ value, label }: TimeUnitProps) => (
  <div className="flex flex-col items-center">
    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-rose-500 text-white rounded-lg flex items-center justify-center mb-2 shadow-lg">
      <span className="text-3xl sm:text-4xl font-bold">{value.toString().padStart(2, '0')}</span>
    </div>
    <span className="text-sm sm:text-base text-muted-foreground font-medium">{label}</span>
  </div>
);

export const CountdownTimer = ({ targetDate }: CountdownTimerProps) => {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(targetDate);

  if (isExpired) {
    return (
      <Card className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/20 dark:to-pink-950/20">
        <CardContent className="p-8 text-center">
          <p className="text-2xl font-bold text-rose-500">O grande dia chegou! 🎉</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/20 dark:to-pink-950/20 border-rose-200 dark:border-rose-800">
      <CardContent className="p-8">
        <h3 className="text-2xl font-bold text-center mb-6 text-foreground">
          Contagem Regressiva
        </h3>
        <div className="flex justify-center gap-4 sm:gap-6">
          <TimeUnit value={days} label="Dias" />
          <TimeUnit value={hours} label="Horas" />
          <TimeUnit value={minutes} label="Minutos" />
          <TimeUnit value={seconds} label="Segundos" />
        </div>
      </CardContent>
    </Card>
  );
};
