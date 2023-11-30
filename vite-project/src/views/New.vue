<template>
  <div class="container2">
    <router-link to="/" class="back-link2">Contacts</router-link>
    <form @submit.prevent="saveContact">
      <div class="form-group">
        <h3>Add Contact</h3>
        <label for="first-name" class="pa">First Name:</label>
        <input
          id="first-name"
          class="pa"
          type="text"
          v-model="contact.first_name"
        />
        <label for="last-name" class="pa">Last Name:</label>
        <input
          id="last-name"
          class="pa"
          type="text"
          v-model="contact.last_name"
        />
        <label for="email" class="pa">Email:</label>
        <input id="email" type="text" v-model="contact.email" class="pa" />
        <button type="submit" class="save-button">Save</button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const contact = ref({
      first_name: "",
      last_name: "",
      email: "",
      id: crypto.randomUUID(),
    });
    const router = useRouter();

    const saveContact = () => {
      const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
      contact.value.id = contacts.length + 1; // Simple ID assignment
      contacts.push(contact.value);
      localStorage.setItem("contacts", JSON.stringify(contacts));
      router.push("/");
      // Redirect to the home page
    };
    console.log(contact);

    return {
      contact,
      saveContact,
    };
  },
};
</script>

<style>
.container2 {
  position: relative;
  padding-top: 0px;
  padding-left: 20px;
}

.form-group {
  position: relative;
  width: 600px;
  background-color: #ffffff; /* Changed to white */
  border-radius: 8px;
  padding: 100px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-left: 20px; /* Adjust left margin as needed */
}

h3 {
  color: black; /* Ensure h3 is black */
}

.pa {
  color: black;
  font-size: 20px;
  text-align: left;
  margin-left: 22px;
}

.pa2.pa3 {
  color: black;
  font-size: 20px;
  text-align: left;
  margin-left: 22px;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: black; /* Ensure labels are black */
}

.save-button {
  background-color: #007bff; /* Changed to a blue color */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-top: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  border-radius: 10px;
}

.back-link2 {
  position: absolute;
  top: -50px;
  left: 40px;
  padding: 5px 15px;
  border: 1px solid white;
  border-radius: 5px;
  background-color: #f2f2f2;
  text-decoration: none;
}
</style>
