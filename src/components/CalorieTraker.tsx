import CaloriesDisplay from "./CaloriesDisplay"
import { useActivity } from "../hooks/useActivity"

const CalorieTraker = () => {

      const { caloriesConsumed, caloriesBurned, netCalories } = useActivity();

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