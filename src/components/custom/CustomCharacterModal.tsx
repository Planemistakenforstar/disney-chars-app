import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setModalOpen, setSelectedCharacter } from "@/store/disneySlice";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  Badge,
  Divider,
  Button,
} from "@mui/material";

import {
  Tv,
  Gamepad2,
  Film,
  Users,
  Swords,
  Castle,
  ExternalLink,
} from "lucide-react";

export const CustomCharacterModal = () => {
  const dispatch = useAppDispatch();
  const { selectedCharacter, isModalOpen } = useAppSelector(
    state => state.disney,
  );

  const handleClose = () => {
    dispatch(setModalOpen(false));
    dispatch(setSelectedCharacter(null));
  };

  if (!selectedCharacter) return null;

  const sections = [
    {
      icon: Film,
      title: "Films",
      items: selectedCharacter.films,
    },
    {
      icon: Tv,
      title: "TV Shows",
      items: selectedCharacter.tvShows,
    },
    {
      icon: Gamepad2,
      title: "Video Games",
      items: selectedCharacter.videoGames,
    },
    {
      icon: Castle,
      title: "Park Attractions",
      items: selectedCharacter.parkAttractions,
    },
    {
      icon: Users,
      title: "Allies",
      items: selectedCharacter.allies,
    },
    {
      icon: Swords,
      title: "Enemies",
      items: selectedCharacter.enemies,
    },
  ];

  return (
    <Dialog open={isModalOpen} onClose={handleClose} fullWidth>
      <DialogContent className="bg-blue-200">
        <DialogTitle className="text-2xl flex items-center justify-between">
          <div className="flex items-center gap-3 !text-blue-500">
            {selectedCharacter.imageUrl && (
              <img
                src={selectedCharacter.imageUrl}
                alt={selectedCharacter.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-primary"
                onError={e => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            )}
            {selectedCharacter.name}
          </div>

          {/* Right side: Close button */}
          <Button
            onClick={handleClose}
            className="text-muted-foreground hover:!text-blue-500 hover:bg-primary/10 p-1 min-w-0"
          >
            x
          </Button>
        </DialogTitle>

        <div className="max-h-[60vh] pr-4">
          <div className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-3 gap-4">
              <div className="disney-card p-4 text-center">
                <Film className="w-6 h-6 mx-auto mb-2 !text-blue-500" />
                <div className="text-2xl font-bold !text-blue-500">
                  {selectedCharacter.films.length}
                </div>
                <div className="text-xs !text-blue-500">Films</div>
              </div>
              <div className="disney-card p-4 text-center">
                <Tv className="w-6 h-6 mx-auto mb-2 !text-blue-500" />
                <div className="text-2xl font-bold !text-blue-500">
                  {selectedCharacter.tvShows.length}
                </div>
                <div className="text-xs !text-blue-500">TV Shows</div>
              </div>
              <div className="disney-card p-4 text-center">
                <Gamepad2 className="w-6 h-6 mx-auto mb-2 !text-blue-500" />
                <div className="text-2xl font-bold !text-blue-500">
                  {selectedCharacter.videoGames.length}
                </div>
                <div className="text-xs !text-blue-500">Video Games</div>
              </div>
            </div>

            {/* Detailed Sections */}
            {sections.map(
              ({ icon: Icon, title, items }) =>
                items.length > 0 && (
                  <div key={title}>
                    <h3 className="flex items-center gap-2 text-sm font-semibold !text-blue-500 mb-3">
                      <Icon className="w-4 h-4 !text-blue-500" />
                      {title} ({items.length})
                    </h3>
                    <div className="flex flex-wrap gap-2 !text-blue-500">
                      {items.map((item, idx) => (
                        <Badge key={idx}>{item}</Badge>
                      ))}
                    </div>
                  </div>
                ),
            )}

            {/* Source Link */}
            {selectedCharacter.sourceUrl && (
              <>
                <Divider className="bg-border" />
                <a
                  href={selectedCharacter.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm !text-blue-500 hover:underline"
                >
                  <ExternalLink className="w-4 h-4" />
                  View on Disney Wiki
                </a>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
