import { Database } from "@/lib/schema";
import { Session, useSupabaseClient } from "@supabase/auth-helpers-react";
import Head from "next/head";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

type Todos = Database["public"]["Tables"]["todos"]["Row"];

export default function TodoList({ session }: { session: Session }) {
  const supabase = useSupabaseClient<Database>();
  const [activeTab, setActiveTab] = useState<"todo" | "team">("todo");
  const [todos, setTodos] = useState<Todos[]>([]);
  const [newTaskText, setNewTaskText] = useState("");
  const [filter, setFilter] = useState<"all" | "completed" | "incomplete">(
    "all"
  );
  const [teamDetails, setTeamDetails] = useState<any>(null);

  const user = session.user;

  const [teamName, setTeamName] = useState("");
  const [teamMember, setTeamMember] = useState("");
  const [teamMembers, setTeamMembers] = useState<string[]>([]);

  const handleTeamNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTeamName(event.target.value);
  };

  useEffect(() => {
    fetchTeamDetails();
  }, [user.id]);

  const handleTeamMemberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTeamMember(event.target.value);
  };

  const handleAddTeamMember = () => {
    if (teamMember.trim() !== "") {
      setTeamMembers([...teamMembers, teamMember]);
      setTeamMember("");
    }
  };

  const fetchTeamDetails = async () => {
    try {
      const { data, error } = await supabase
        .from("teams")
        .select("team_name, team_members")
        .eq("user_id", user.id);

      if (error) {
        throw new Error(error.message);
      }

      if (data && data.length > 0) {
        setTeamDetails(data);
      } else {
        setTeamDetails(null);
      }
    } catch (error) {
      console.error("Error fetching team details:", error);
    }
  };

  const handleSaveTeam = async () => {
    if (teamName.trim() !== "" && teamMembers.length > 0) {
      try {
        // Save team information to the database
        const { data: team, error } = await supabase.from("teams").upsert([
          {
            team_name: teamName,
            team_members: teamMembers,
            user_id: user.id,
          },
        ]);

        if (error) {
          throw new Error(error.message);
        } else {
          console.log("Team saved successfully:", team);
          toast.success("Team information saved successfully!");
          setTeamName("");
          setTeamMembers([]);
        }
      } catch (error) {
        toast.error(
          "An error occurred while saving team information. Please try again later."
        );
      }
    } else {
      toast.error("Team Name and Team Members are required.");
    }
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const { data, error } = await supabase
          .from("todos")
          .select("*")
          .order("id", { ascending: true });

        if (error) {
          toast.error("Error fetching todos");
        } else {
          if (data) {
            let filteredTodos = data;

            if (filter === "completed") {
              filteredTodos = data.filter((todo) => todo.is_complete);
            } else if (filter === "incomplete") {
              filteredTodos = data.filter((todo) => !todo.is_complete);
            }

            setTodos(filteredTodos);
          }
        }
      } catch (error) {
        toast.error("An error occured. Check your network connection.");
      }
    };

    fetchTodos();
  }, [supabase, filter]);

  const handleDeleteTeam = async (teamId: string) => {
    try {
      await supabase
        .from("teams")
        .delete()
        .eq("id", teamId.toString())
        .throwOnError();
  
      toast.success("Team deleted successfully!");
      fetchTeamDetails(); // Assuming this function fetches and updates team details
    } catch (error) {
      toast.error("Error deleting the team. Please try again later.");
    }
  };
  
  

  const addTodo = async (taskText: string) => {
    let task = taskText.trim();
    if (task.length) {
      try {
        const { data: todo, error } = await supabase
          .from("todos")
          .insert({ task, user_id: user.id })
          .select()
          .single();

        if (error) {
          throw new Error(error.message);
        } else {
          setTodos([...todos, todo]);
          setNewTaskText("");
          toast.success("Todo added successfully!");
        }
      } catch (error) {
        toast.error("Todo cannot be added. Please try again later");
      }
    } else {
      toast.error("Task cannot be empty!");
    }
  };

  const deleteTodo = async (id: string | number) => {
    try {
      await supabase
        .from("todos")
        .delete()
        .eq("id", id.toString())
        .throwOnError();
      setTodos(todos.filter((x) => x.id !== id));
      toast.success("Todo deleted successfully!");
    } catch (error) {
      toast.error("Todo cannot be deleted. Please try again later");
    }
  };

  const toggleTodo = async (id: string | number, isComplete: boolean) => {
    try {
      const { data } = await supabase
        .from("todos")
        .update({ is_complete: !isComplete })
        .eq("id", id)
        .throwOnError()
        .select()
        .single();

      if (data) {
        const updatedTodos = todos.map((todo) =>
          todo.id === id ? { ...todo, is_complete: data.is_complete } : todo
        );
        setTodos(updatedTodos);
        toast.success("Todo updated successfully!");
      }
    } catch (error) {
      toast.error("Todo cannot be updated. Please try again later");
    }
  };

  const editTodo = async (id: string | number, updatedTask: string) => {
    try {
      const { data } = await supabase
        .from("todos")
        .update({ task: updatedTask })
        .eq("id", id.toString())
        .throwOnError()
        .select()
        .single();

      if (data) {
        const updatedTodos = todos.map((todo) =>
          todo.id === id ? { ...todo, task: data.task } : todo
        );
        setTodos(updatedTodos);
        toast.success("Todo edited successfully!");
      }
    } catch (error) {
      toast.error("Todo cannot be edited. Please try again later");
    }
  };
  return (
    <div className="w-full" style={{ paddingTop: "-10vh" }}>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="flex justify-between mb-4">
        <button
          className={`btn-black ${activeTab === "todo" ? "bg-gray-900" : "bg-blue-600"}`}
          onClick={() => setActiveTab("todo")}
        >
          Todo List
        </button>

        <h1 className="text-3xl justify-center flex font-bold mb-4">
          Todo List
        </h1>
        <button
          className={`btn-black ${activeTab === "team" ? "bg-gray-900" : "bg-blue-600"}`}
          onClick={() => setActiveTab("team")}
        >
          Your team
        </button>
      </div>

      {activeTab === "todo" && (
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addTodo(newTaskText);
            }}
            className="flex gap-2 my-2"
          >
            <input
              className="rounded p-2 flex-grow border border-green-950"
              type="text"
              style={{ border: "2px solid rebeccapurple" }}
              placeholder="Add a new task (min 4 chars.)"
              value={newTaskText}
              onChange={(e) => {
                setNewTaskText(e.target.value);
              }}
            />
            <button className="btn-black bg-green-600 hover:bg-green-500" type="submit">
              Add
            </button>
          </form>

          <div className="flex items-center mt-4">
            <span className="mr-2">Show:</span>
            <select
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value as "all" | "completed" | "incomplete");
              }}
              className="p-2 border rounded"
            >
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="incomplete">Incomplete</option>
            </select>
          </div>
          <div className="bg-white shadow overflow-hidden rounded-md mt-4">
            <ul>
              {todos.map((todo) => (
                <Todo
                  key={todo.id}
                  todo={todo}
                  onDelete={() => deleteTodo(String(todo.id))}
                  onToggle={() =>
                    toggleTodo(todo.id, todo.is_complete || false)
                  }
                  onEdit={(updatedTask) =>
                    editTodo(String(todo.id), updatedTask)
                  }
                />
              ))}
            </ul>
          </div>
        </div>
      )}
      {activeTab === "team" && (
        <div>
          <div className="flex gap-2 mt-6 my-2 flex-row">
            <input
              className="rounded p-2 w-1/2"
              style={{ border: "1px solid green" }}
              type="text"
              placeholder="Team Name"
              value={teamName}
              onChange={handleTeamNameChange}
            />
            <input
              className="rounded p-2 border w-1/2 border-green-950"
              style={{ border: "1px solid green" }}
              type="text"
              placeholder="Team Member"
              value={teamMember}
              onChange={handleTeamMemberChange}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex gap-2 float-right justify-center mt-6 flex-row">
              <button
                className="btn-black bg-blue-600 hover:bg-blue-500"
                type="button"
                onClick={handleAddTeamMember}
              >
                Add Member
              </button>
              <button
                className="btn-black bg-green-600 hover:bg-green-500"
                type="button"
                onClick={handleSaveTeam}
              >
                Save Team
              </button>
            </div>
            <div>
              {teamMembers.length > 0 && (
                <div className="my-4">
                  <h2 className="text-lg mb-4 font-bold">Team Members</h2>
                  <table className="border-collapse border w-full">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="border p-2">S.No</th>
                        <th className="border p-2">Member</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teamMembers.map((member, index) => (
                        <tr key={index} style={{ border: "1px solid black" }}>
                          <td
                            className="border p-2"
                            style={{ border: "1px solid black" }}
                          >
                            {index + 1}
                          </td>
                          <td
                            className="border p-2"
                            style={{ border: "1px solid black" }}
                          >
                            {member}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            <div>
              {teamDetails &&
                teamDetails.length > 0 &&
                teamDetails.map((team: any, teamIndex: number) => (
                  <div
                    key={teamIndex}
                    className="my-4 flex flex-col justify-center"
                  >
                    {/* <h1 className="text-lg mb-4 mt-4 font-bold">Team Members</h1> */}
                    <h3
                      className="text-mg mb-4 mt-4 font-bold rounded-lg p-2 mx-auto flex items-center justify-center w-1/2 bg-gray-200"
                      style={{ border: "1px solid black" }}
                    >
                      Team Name:&nbsp;{" "}
                      <span style={{ color: "orange", fontSize: "2.5vh" }}>
                        {" "}
                        {team.team_name}
                      </span>
                    </h3>
                    <table
                      className="border-collapse mb-4 border w-full"
                      style={{ border: "1px solid black" }}
                    >
                      <thead>
                        <tr
                          className="bg-gray-200 "
                          style={{ border: "1px solid black" }}
                        >
                          <th
                            className="border p-2"
                            style={{ border: "1px solid black" }}
                          >
                            S.No
                          </th>
                          <th
                            className="border p-2"
                            style={{ border: "1px solid black" }}
                          >
                            Member
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {team.team_members.map(
                          (member: string, index: number) => (
                            <tr key={index}>
                              <td
                                className="border p-2"
                                style={{ border: "1px solid black" }}
                              >
                                {index + 1}
                              </td>
                              <td
                                className="border p-2"
                                style={{ border: "1px solid black" }}
                              >
                                {member}
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                    <button
                      className="btn-black bg-red-600 hover:bg-red-500 shadow rounded-xl p-4 w-30 items-end justify-end"
                      type="button"
                      style={{  margin: "auto" }}
                      onClick={() => handleDeleteTeam(team.id)}
                    >
                      Leave Team
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
      <Toaster />
    </div>
  );
}

const Todo = ({
  todo,
  onDelete,
  onToggle,
  onEdit,
}: {
  todo: Todos;
  onDelete: () => void;
  onToggle: () => void;
  onEdit: (updatedTask: string) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(todo.task);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit(editedTask || "");
    setIsEditing(false);
  };

  return (
    <li className="border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <input
            className="cursor-pointer"
            type="checkbox"
            checked={todo.is_complete || false}
            onChange={onToggle}
          />
          {isEditing ? (
            <input
              className="ml-2 px-2 py-1 border rounded"
              type="text"
              value={editedTask || ""}
              onChange={(e) => setEditedTask(e.target.value)}
            />
          ) : (
            <span
              className={`ml-2 ${
                todo.is_complete ? "line-through text-gray-500" : "text-black"
              }`}
            >
              {todo.task}
            </span>
          )}
        </div>
        <div className="flex items-center">
          {isEditing ? (
            <button
              className="text-green-500 bg-green-100 hover:bg-green-300 text-md h-10 py-2 px-4 rounded-md hover:text-green-700 te"
              onClick={handleSave}
            >
              Save
            </button>
          ) : (
            <>
              <button
                className="text-blue-500 h-10 py-2 px-4 rounded-md text-md bg-blue-100 hover:bg-blue-300 hover:text-blue-700"
                onClick={handleEdit}
              >
                Edit
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onDelete();
                }}
                className="ml-2 text-red-500 h-10 py-2 px-4 rounded-md text-md bg-red-100 hover:bg-red-300 hover:text-red-700"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </li>
  );
};
