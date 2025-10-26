<template>
    <form class="form-block">
        <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" placeholder="Enter your name">
        </div>
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email">
        </div>
        <button type="submit">Submit</button>
    </form>
</template>

<style scoped>
.form-block {
    @apply p-4 bg-white space-y-4;
    border: none;
}

.form-group {
    @apply flex flex-col;
}

label {
    @apply mb-1 text-sm font-medium text-gray-700;
}

input {
    @apply px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500;
    border: 1px solid #e5e7eb;
}

button {
    @apply w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700;
}
</style>
