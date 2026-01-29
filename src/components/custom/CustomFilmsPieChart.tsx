import { useMemo, useCallback } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useAppSelector } from "@/store/hooks";
import { Button } from "@mui/material";
import { Download } from "lucide-react";
import * as XLSX from "xlsx";

export const CustomFilmsPieChart = () => {
  const { filteredCharacters, currentPage, itemsPerPage } = useAppSelector(
    state => state.disney,
  );

  // Get only characters on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPageCharacters = filteredCharacters.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const chartData = useMemo(() => {
    return currentPageCharacters
      .filter(char => char.films.length > 0)
      .map(char => ({
        name: char.name,
        y: char.films.length,
        films: char.films,
      }));
  }, [currentPageCharacters]);

  const handleExportXLSX = useCallback(() => {
    const exportData = currentPageCharacters.map(char => ({
      "Character Name": char.name,
      "Number of Films": char.films.length,
      Films: char.films.join(", "),
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Disney Films Data");

    // Auto-size columns
    const maxWidth = exportData.reduce((max, row) => {
      const filmsLength = row["Films"].length;
      return filmsLength > max ? filmsLength : max;
    }, 20);
    worksheet["!cols"] = [
      { wch: 30 },
      { wch: 15 },
      { wch: Math.min(maxWidth, 100) },
    ];

    XLSX.writeFile(workbook, `disney-films-page-${currentPage}.xlsx`);
  }, [currentPageCharacters, currentPage]);

  const options: Highcharts.Options = {
    chart: {
      type: "pie",
      backgroundColor: "transparent",
      height: 400,
    },
    title: {
      text: `Films per Character (Page ${currentPage})`,
      style: {
        color: "rgb(43 127 255)",
        fontFamily: "Roboto",
        fontSize: "16px",
      },
    },
    subtitle: {
      text: `${currentPageCharacters.length} characters on this page`,
      style: {
        color: "rgb(43 127 255)",
        fontSize: "12px",
      },
    },
    tooltip: {
      backgroundColor: "hsl(222, 47%, 14%)",
      borderColor: "hsl(45, 93%, 58%)",
      style: {
        color: "#5fa8f1",
      },
      useHTML: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      formatter: function (this: any) {
        const films = this.point?.options?.films || [];
        const filmsList =
          films.length > 5
            ? films.slice(0, 5).join("<br/>") +
              `<br/><em>...and ${films.length - 5} more</em>`
            : films.join("<br/>");
        return `
          <div style="padding: 8px;">
            <strong className="!text-blue-400">${this.point?.name}</strong><br/>
            <span style="color: #94a3b8;">Films: ${this.point?.y} (${this.percentage?.toFixed(1)}%)</span>
            <hr style="border-color: #334155; margin: 8px 0;"/>
            <div style="max-height: 150px; overflow-y: auto; font-size: 11px;">
              ${filmsList}
            </div>
          </div>
        `;
      },
    },
    accessibility: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        borderColor: "hsl(222, 47%, 20%)",
        borderWidth: 2,
        dataLabels: {
          enabled: true,
          format: "{point.name}: {point.y}",
          style: {
            color: "#60aefc",
            textOutline: "none",
            fontSize: "10px",
          },
          distance: 20,
        },
        showInLegend: false,
      },
    },
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        type: "pie",
        name: "Films",
        data: chartData,
        colors: [
          "#3b82f6",
          "#8b5cf6",
          "#f59e0b",
          "#ef4444",
          "#10b981",
          "#06b6d4",
          "#ec4899",
          "#f97316",
          "#84cc16",
          "#6366f1",
          "#14b8a6",
          "#a855f7",
          "#eab308",
          "#22c55e",
          "#0ea5e9",
        ],
      },
    ],
  };

  return (
    <div className="p-4">
      {chartData.length > 0 ? (
        <div className="h-[400px] flex items-center justify-center !text-blue-400">
          <HighchartsReact highcharts={Highcharts} options={options} />
          <Button
            variant="outlined"
            size="small"
            className="border-border hover:bg-primary/20 hover:text-primary"
            onClick={handleExportXLSX}
          >
            <Download className="w-4 h-4 mr-2" />
            Export XLSX
          </Button>
        </div>
      ) : (
        <div className="h-[100px] flex items-center justify-center text-muted-foreground">
          No characters with films on this page
        </div>
      )}
    </div>
  );
};
