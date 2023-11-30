<router-view :key="$route.fullPath"></router-view>
<template>
  <div class="container">
    <h1>Contacts Book</h1>
    <router-link :to="`/new`" class="add-button">+</router-link>
    <div>
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search"
        class="search-bar"
      />
    </div>
    <ol>
      <li v-for="contact in filteredContacts" :key="contact.id">
        <router-link :to="`/details/${contact.id}`">
          {{ contact.first_name }} {{ contact.last_name }}
        </router-link>
      </li>
    </ol>
  </div>
</template>

<script>
const book = [
  {
    email: "53422659@qq.com",
    first_name: "Grace",
    id: 1,
    last_name: "You",
  },
  {
    email: "contact2@example.com",
    first_name: "James",
    id: 2,
    last_name: "Smith",
  },
  {
    email: "contact3@example.com",
    first_name: "Emma",
    id: 3,
    last_name: "Johnson",
  },
  {
    email: "contact4@example.com",
    first_name: "Michael",
    id: 4,
    last_name: "Williams",
  },
  {
    email: "contact5@example.com",
    first_name: "Sophia",
    id: 5,
    last_name: "Brown",
  },
  {
    email: "contact6@example.com",
    first_name: "William",
    id: 6,
    last_name: "Jones",
  },
];

import { ref, computed, watch, onMounted } from "vue";
import { useRoute } from "vue-router";

export default {
  setup() {
    const contacts = ref([]);
    const searchQuery = ref("");
    const route = useRoute();

    const loadContacts = () => {
      const storedContacts = localStorage.getItem("contacts");
      if (storedContacts) {
        contacts.value = JSON.parse(storedContacts);
      } else {
        contacts.value = book;
      }
    };

    const saveContacts = () => {
      localStorage.setItem("contacts", JSON.stringify(contacts.value));
    };

    const filteredContacts = computed(() => {
      let filtered = contacts.value;
      if (searchQuery.value) {
        filtered = filtered.filter(
          (contact) =>
            contact.first_name
              .toLowerCase()
              .includes(searchQuery.value.toLowerCase()) ||
            contact.last_name
              .toLowerCase()
              .includes(searchQuery.value.toLowerCase())
        );
      }
      return filtered.sort((a, b) => a.last_name.localeCompare(b.last_name));
    });

    watch(
      contacts,
      () => {
        saveContacts();
      },
      { deep: true }
    );

    onMounted(loadContacts);

    // Re-fetch contacts when the route changes to home
    watch(
      () => route.path,
      (newPath, oldPath) => {
        if (newPath === "/" && oldPath.startsWith("/edit")) {
          loadContacts();
        }
      }
    );

    return {
      searchQuery,
      filteredContacts,
    };
  },
};
</script>
<style>
body,
html {
  margin: 0;
  padding: 0;
  background-color: lightblue; /* Match the overall background color */
  font-family: Arial, sans-serif;
}

.container {
  text-align: center; /* Center container content */
  padding: 20px; /* Padding around the content */
  background-color: lightblue; /* Background color of the container */
}

h1 {
  margin: 0; /* Removes default margin */
  /* Add any additional styling needed for the title */
}

.add-button {
  display: block; /* Block display to place it on a new line */
  margin: 10px auto; /* Center the button horizontally with automatic margins */
  padding: 5px 10px; /* Padding around the '+' for better touch target */
  font-size: 24px; /* Size of the '+' sign */
  text-decoration: none; /* No underline */
  color: #333; /* Color of the '+' sign */
  /* Add any additional styling needed for the button */
}

.search-bar {
  width: 80%; /* Adjust the width as needed */
  margin: 10px auto; /* Center the search bar horizontally with automatic margins */
  padding: 10px; /* Padding inside the search bar */
  border: 1px solid #ddd; /* Border color and width */
  border-radius: 10px; /* Rounded corners for the search bar */
  box-sizing: border-box; /* Box-sizing to include padding and border in the width */
}

/* Add styles for ol and li here if needed */

/* Style the search input */
input[type="text"] {
  width: calc(100% - 40px); /* Adjust width to account for padding */
  padding: 10px;
  margin: 10px 20px; /* Match margin to align with list items */
  border: 1px solid #ddd; /* Border color */
  border-radius: 10px; /* Rounded corners */
  box-sizing: border-box;
  background-color: #fff;
}

input[type="text"]::placeholder {
  color: #888;
}

input[type="text"] {
  width: calc(100% - 40px); /* Adjust width to account for padding */
  padding: 10px;
  margin: 10px 20px; /* Match margin to align with list items */
  border: 1px solid #ddd; /* Border color */
  border-radius: 10px; /* Rounded corners */
  box-sizing: border-box;
  background-color: #fff;
  color: black;
}

ol {
  list-style-type: none;
  padding: 0;
  margin: 20px; /* Align with search bar */
}

li {
  background-color: #fff;
  margin-bottom: 5px;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  border-radius: 10px; /* Rounded corners */
}

router-link {
  text-decoration: none;
  color: #333;
  display: block;
}
</style>
