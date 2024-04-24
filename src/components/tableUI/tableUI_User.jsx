import "./tableUI.css";
import LockIcon from "@mui/icons-material/Lock";

export function TableUIUser({ table, setTableDetails, setFormData }) {
  const type = table && table.typeee;
  const mongoId = table && table._id;
  const id = `${type}_${mongoId}`;
  const initialXPosition = table && table.xPosition;
  const initialYPosition = table && table.yPosition;
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
        <span className={`icon ${table.locked === true ? "lock" : ""}`}>
          <LockIcon />
        </span>
      </div>
    </>
  );
}
