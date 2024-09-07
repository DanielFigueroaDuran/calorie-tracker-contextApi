import { useState, ChangeEvent, FormEvent, useEffect } from "react"
import { v4 as uuidv4 } from "uuid";
import { categories } from "../data/categories"
import { Activity } from "../types";
import { useActivity } from "../hooks/useActivity";


const initialState: Activity = {
      id: uuidv4(),
      category: 1,
      name: '',
      calories: 0
}

const Form = () => {

      const { state, dispatch } = useActivity();

      const [activity, setActivity] = useState<Activity>(initialState);

      useEffect(() => {
            if (state.activeId) {
                  const selectedActivity = state.activities.filter(stateActivity => stateActivity.id === state.activeId)[0]
                  setActivity(selectedActivity);
            }
      }, [state.activeId])

      const handleChange = (event: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {

            const isNumberField = ['category', 'calories'].includes(event.target.id);

            //console.log(isNumberField);

            setActivity({
                  ...activity,
                  [event.target.id]: isNumberField ? +event.target.value : event.target.value
            });
      }

      const isValidActivity = () => {
            const { name, calories } = activity
            return name.trim() !== '' && calories > 0
      }

      const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            dispatch({ type: 'save-activity', payload: { newActivity: activity } });

            setActivity({
                  ...initialState,
                  id: uuidv4()
            });
      }

      // console.log(activity);

      return (
            <form
                  className="space-y-5 bg-white shadow p-10 rounded-lg"
                  onSubmit={handleSubmit}
            >
                  <div className="grid grid-cold-1 gap-3">
                        <label htmlFor="category" className="font-bold">Categoria:</label>
                        <select
                              className="border border-slate-300  p-2 rounded-lg w-full bg-white"
                              id="category"
                              value={activity.category}
                              onChange={handleChange}
                        >
                              {categories.map(category => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                              ))}
                        </select>
                  </div>

                  <div className="grid grid-cold-1 gap-3">
                        <label htmlFor="name" className="font-bold">Actividad:</label>
                        <input
                              className="border border-slate-300 p-2 rounded-lg"
                              type="text"
                              id="name"
                              placeholder="Ej. Comida, Jugo de Naranja, Ensalada, Ejercicio, Presas, Bicicleta"
                              value={activity.name}
                              onChange={handleChange}
                        />
                  </div>

                  <div className="grid grid-cold-1 gap-3">
                        <label htmlFor="calories" className="font-bold">Calorias:</label>
                        <input
                              className="border border-slate-300 p-2 rounded-lg"
                              type="number"
                              id="calories"
                              placeholder="Calorias Ej. 300 o 500"
                              value={activity.calories}
                              onChange={handleChange}
                        />
                  </div>

                  <input
                        className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
                        type="submit"
                        value={activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'}
                        disabled={!isValidActivity()}
                  />
            </form>
      )
}

export default Form