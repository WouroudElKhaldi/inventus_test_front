import useDragger from "../../hook/useDragger";
import "./tableUI.css";

export function TableUI({
  table,
  setTableDetails,
  setFormData,
  allTablePositions,
}) {
  const type = table && table.typeee;
  const mongoId = table && table._id;
  const id = `${type}_${mongoId}`;
  const initialXPosition = table && table.xPosition;
  const initialYPosition = table && table.yPosition;

  useDragger(id, table, allTablePositions);
  return (
    <>
      <div
        id={id}
        className={`${type} ${table.locked === true ? "locked" : "open"}`}
        style={{
          position: "absolute",
          top: `${initialYPosition}px`,
          left: `${initialXPosition}px`,
        }}
        onClick={() => {
          setTableDetails(table);
          setFormData((prev) => ({
            ...prev,
            tableId: table._id,
          }));
        }}
      >
        {table && table.number}
      </div>
    </>
  );
}
