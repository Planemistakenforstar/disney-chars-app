interface Props {
  title: string;
  description: string;
  poweredDesc: string;
}

export const CustomJumbotron = ({ title, description, poweredDesc }: Props) => {
  return (
    <header className="bg-card text-card-foreground border-border rounded-lg p-4 text-blue-500">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative"></div>
            <div>
              <h1 className="text-3xl font-bold underline">{title}</h1>
              <p className="text-sm text-muted-foreground hidden md:block">
                {description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium border border-primary/30">
              {poweredDesc}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
