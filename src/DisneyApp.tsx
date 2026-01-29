import { useEffect } from "react";
import { CustomJumbotron } from "./components/custom/CustomJumbotron";
import { CustomCharacterTable } from "./components/custom/CustomCharacterTable";
import { fetchAllCharacters } from "./store/disneySlice";

import { useAppDispatch, useAppSelector } from "./store/hooks";

import { CustomCharacterModal } from "./components/custom/CustomCharacterModal";
import { CustomStatsRibbon } from "./components/custom/CustomsStatsRibbon";
import { CustomFilterForm } from "./components/custom/CustomFilterForm";
import { CustomFilmsPieChart } from "./components/custom/CustomFilmsPieChart";

export const DisneyApp = () => {
  const dispatch = useAppDispatch();
  const { error } = useAppSelector(state => state.disney);

  useEffect(() => {
    dispatch(fetchAllCharacters());
  }, [dispatch]);

  return (
    <div className="App">
      {/*Header of our application */}
      <div className="min-h-screen bg-background">
        <CustomJumbotron
          title="Disney Character Explorer"
          description="Discover the magical world of Disney characters"
          poweredDesc="✨ Powered by Disney API"
        />

        <main className="container mx-auto px-4 py-6">
          {error && (
            <div className="disney-card p-4 mb-6 border-destructive bg-destructive/10">
              <p className="text-destructive font-medium">Error: {error}</p>
            </div>
          )}

          <CustomStatsRibbon />

          <div className="lg:col-span-1 space-y-6">
            <CustomFilterForm />
          </div>

          {/* Films Pie Chart - Updates per page */}
          <div className="grid grid-cols-1 ">
            <CustomFilmsPieChart />
          </div>

          {/* Table */}
          <CustomCharacterTable />
        </main>
        <CustomCharacterModal />
      </div>
    </div>
  );
};
