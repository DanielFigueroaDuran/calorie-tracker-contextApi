import { useContext } from "react"
import { ActivityContext } from "../context/activityContext";

export const useActivity = () => {
      const context = useContext(ActivityContext);

      if (!context) {
            throw new Error('El hook useContext debe ser utilizado en un ActivityProvider');
      }
      return context;
}