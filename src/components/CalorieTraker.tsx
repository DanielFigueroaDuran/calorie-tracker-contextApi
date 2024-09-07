import { useMemo } from "react"
import CaloriesDisplay from "./CaloriesDisplay"
import { useActivity } from "../hooks/useActivity"

const CalorieTraker = () => {

      const { state } = useActivity();

      const { activities } = state

      //console.log(activities)

      const caloriesConsumed = useMemo(() => activities.reduce((total, activity) => activity.category === 1 ? total + activity.calories : total, 0), [activities]);
      const caloriesBurned = useMemo(() => activities.reduce((total, activity) => activity.category === 2 ? total + activity.calories : total, 0), [activities]);
      const netCalories = useMemo(() => caloriesConsumed - caloriesBurned, [activities]);

      // console.log(caloriesBurned)

      return (
            <>
                  <h1 className="text-4xl font-bold text-white text-center">Resumen de Calorias</h1>

                  <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
                        <CaloriesDisplay
                              calories={caloriesConsumed}
                              text="Consumidas"
                        />

                        <CaloriesDisplay
                              calories={caloriesBurned}
                              text="Ejercicios"
                        />

                        <CaloriesDisplay
                              calories={netCalories}
                              text="Diferencia"
                        />
                  </div>

            </>
      )
}

export default CalorieTraker