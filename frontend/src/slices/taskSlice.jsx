import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import tasksService from "../services/tasksService";

const initialState = {
    tasks: [],
    task: {},
    error: false,
    success: false,
    loading: false,
    message: null,
};

// Insert user task
export const insertTask = createAsyncThunk(
    "task/insert",
    async (task, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;

        const data = await tasksService.addTask(task, token);

        // Check for errors
        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        }

        return data;
    }
);

// Get user tasks
export const getUserTasks = createAsyncThunk(
    "task/usertasks",
    async (id, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;

        const data = await tasksService.getUserTasks(id, token);

        return data;
    }
);

// Delete a task
export const deleteTask = createAsyncThunk(
    "task/delete",
    async (id, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;

        const data = await tasksService.deleteTask(id, token);

        // Check for errors
        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        }

        return data;
    }
);

// Update a task
export const updateTask = createAsyncThunk(
    "task/update",
    async (taskData, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;

        const data = await tasksService.updateTask(
            { title: taskData.title },
            taskData.id,
            token
        );

        // Check for errors
        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        }

        return data;
    }
);



export const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(insertTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(insertTask.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.task = action.payload;
                state.tasks.unshift(state.task);
                state.message = "Tarefa inserida com sucesso!";
            })
            .addCase(insertTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.task = null;
            })
            .addCase(getUserTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.tasks = action.payload;
            })
            .addCase(deleteTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.tasks = state.tasks.filter((task) => {
                    return task._id !== action.payload.id;
                });

                state.message = action.payload.message;
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.photo = null;
            })
            .addCase(updateTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.error = null;
                state.tasks.map((task) => {
                    if (task._id === action.payload.task._id) {
                        return (task.title = action.payload.task.title);
                    }

                    return task;
                });

                state.message = action.payload.message;
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.photo = null;
            })

    },
});

export const { resetMessage } = taskSlice.actions;
export default taskSlice.reducer;
