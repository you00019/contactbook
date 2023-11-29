<!-- <template>
  <div> -->
<!-- <h1>
      Here are the details... id: <span @click="updateItem">{{ id }}</span>
    </h1> -->

<!-- <form @submit.prevent="updateItem">
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="movie.name" /> -->
<!-- <button type="submit">Update</button> -->
<!-- </form>
    <p>{{ status }}</p> -->
<!-- <p>Movie: {{ movie.name }}</p> -->

<!-- </div>
</template> -->

<!-- <script>
export default {
  props: ["id"],
  data() {
    return {
      first_name: "",
      last_name: "",
      email: "",
    };
  },

  created() {
    this.movies = JSON.parse(localStorage.getItem("items"));
    if (this.movies) {
      this.movie = this.movies.find((item) => item.id === this.id);
    }
  },
  methods: {
    updateItem: function () {
      localStorage.setItem(
        "items",
        JSON.stringify(
          this.movies.map((movie) =>
            movie.id === this.id ? { ...this.movie } : movie
          )
        )
      );
      //   this.status = "Movie updated...";
      this.$router.push("/details");
    },
  },
};
</script> -->

<template>
  <div class="container1">
    <div class="contact-card">
      <!-- Contact Display -->
      <div class="contact-display">
        <h1 class="contact-name">
          {{ contact.first_name }} {{ contact.last_name }}
        </h1>
        <hr class="contact-divider" />
        <p class="contact-email">Email: {{ contact.email }}</p>
      </div>

      <!-- Edit Link -->
      <!-- <router-link class="contact-edit-link" to="/edit/:id">Edit</router-link> -->
      <router-link :to="`/edit/${contact.id}`" class="contact-edit-link"
        >Edit</router-link
      >

      <!-- Contacts Link -->
      <router-link class="contact-back-link" to="/">Contacts</router-link>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const contact = ref({}); // This ref will hold our contact object

    // Fetch the contact from local storage when the component mounts
    const fetchContact = () => {
      const storedContacts = localStorage.getItem("contacts");
      if (storedContacts) {
        const contacts = JSON.parse(storedContacts);
        // Parse the id from the route parameter as an integer
        const foundContact = contacts.find(
          (c) => c.id === parseInt(route.params.id, 10)
        );
        if (foundContact) {
          contact.value = foundContact;
        } else {
          router.push("/"); // If not found, redirect to home
        }
      } else {
        router.push("/"); // If no contacts, redirect to home
      }
    };

    onMounted(fetchContact);

    return {
      contact,
    };
  },
};
</script>

<style>
.contact-card {
  position: relative;
  width: 600px; /* Set a fixed width for the card */
  background-color: #fff;
  border-radius: 8px;
  padding: 100px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-left: 20px; /* Adjust left margin as needed */
}

.contact-display {
  text-align: left;
  width: 100%;
}

.contact-name {
  font-size: 20px;
  color: #333; /* Darker text color for the name */
  margin-bottom: 4px;
}

.contact-email {
  color: #555; /* Lighter text color for email */
  font-size: 16px;
  margin-bottom: 16px;
}

.contact-back-link,
.contact-edit-link {
  position: absolute;
  top: -35px; /* Adjust as necessary */
  padding: 5px 15px;
  border: 1px solid #000;
  border-radius: 5px;
  background-color: #f2f2f2;
  text-decoration: none;
}

.contact-back-link {
  left: -5px; /* Adjust to align with the card's border */
}

.contact-edit-link {
  right: -5px; /* Adjust to align with the card's border */
}

.contact-back-link,
.contact-edit-link {
  position: absolute;
  top: -50px; /* Increase this value to create more space (gap) */
  padding: 5px 15px;
  border: 1px solid white;
  border-radius: 5px;
  background-color: #f2f2f2;
  text-decoration: none;
}

.contact-display {
  margin-top: -60px; /* Provide space for the absolute positioned links */
}

.contact-name,
.contact-email {
  margin: 0;
  padding: 0;
}

.contact-divider {
  border: none;
  height: 1px;
  background-color: #000;
  margin: 10px 0;
}

.container1 {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding-top: 50px; /* Adjust top padding to lower the card */
  height: 100vh; /* Full height to push the card down */
}
</style>
