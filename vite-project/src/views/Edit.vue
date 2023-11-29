<template>
  <div class="container2">
    <div class="edit-container">
      <router-link to="/" class="back-link">Contacts</router-link>
      <h3>Edit Contact</h3>
      <div v-if="contact">
        <form @submit.prevent="updateContact">
          <p>First Name:</p>
          <input
            type="text"
            v-model="contact.first_name"
            placeholder="First Name"
          />
          <p>Last Name:</p>
          <input
            type="text"
            v-model="contact.last_name"
            placeholder="Last Name"
          />
          <p>Email:</p>
          <input type="text" v-model="contact.email" placeholder="Email" />
          <div class="actions">
            <button type="submit" class="update">Update Contact</button>
            <button type="button" class="cancel" @click="cancelEdit">
              Cancel
            </button>
          </div>
        </form>
        <button class="delete-button" @click="deleteContact">
          Delete Contact
        </button>
      </div>
      <div v-else>
        <p>Contact not found.</p>
      </div>
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
    const contact = ref(null);

    // Fetch the contact to edit
    const fetchContact = () => {
      const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
      const foundContact = contacts.find(
        (c) => c.id === parseInt(route.params.id, 10)
      );
      if (foundContact) {
        contact.value = foundContact;
      }
    };

    const updateContact = () => {
      const id = parseInt(route.params.id, 10); // Get the id from the route parameters
      let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
      const index = contacts.findIndex((c) => c.id === id);

      console.log("Updating contact with index:", index); // Debugging line
      if (index !== -1) {
        contacts[index] = { ...contact.value, id: id }; // Update the contact with the same id
        localStorage.setItem("contacts", JSON.stringify(contacts));
        console.log("Contact updated:", contacts[index]); // Debugging line
        router.push(`/details/${id}`); // Navigate to the details page of the updated contact
      } else {
        console.error("Contact not found for update."); // Error message for debugging
      }
    };

    const deleteContact = () => {
      let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
      const initialLength = contacts.length;
      contacts = contacts.filter((c) => c.id !== parseInt(route.params.id, 10));
      localStorage.setItem("contacts", JSON.stringify(contacts));
      if (contacts.length < initialLength) {
        console.log("Contact deleted."); // Debugging line
        router.push("/");
      } else {
        console.error("Contact not found for deletion."); // Error message for debugging
      }
    };

    // Cancel the edit
    const cancelEdit = () => {
      router.push("/");
    };

    onMounted(fetchContact);

    return {
      contact,
      updateContact,
      deleteContact,
      cancelEdit,
    };
  },
};
</script>

<style>
h3 {
  color: black;
  font-size: 40px;
}

p {
  color: black;
  font-size: 20px;
  text-align: left;
  margin-left: 22px;
}

.edit-container {
  position: relative;
  width: 600px; /* Set a fixed width for the card */
  background-color: #fff;
  border-radius: 8px;
  padding: 100px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-left: 20px; /* Adjust left margin as needed */
}

.back-link {
  position: absolute;
  top: -50px; /* Align with the top edge of container2 */
  left: 0; /* Align with the left edge of container2 */
  padding: 5px 15px;
  border: 1px solid white;
  border-radius: 5px;
  background-color: #f2f2f2;
  text-decoration: none;
}

.edit-form {
  margin-top: 50px;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.form-row p {
  margin: 0;
  font-size: 18px;
  color: #333;
}

.form-row {
  margin-bottom: 15px;
}

.input {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.actions {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

.actions button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.update {
  position: absolute;
  left: 200px; /* Align with the left edge of container2 */
  padding: 5px 15px;
  border: 1px solid white;
  border-radius: 10px;
  background-color: blue;
  text-decoration: none;
  color: white;
}

.cancel {
  position: absolute;
  left: 450px;
  /* Align with the left edge of container2 */
  padding: 5px 15px;
  border: 1px solid white;
  border-radius: 10px;
  background-color: grey;
  text-decoration: none;
  color: white;
}

.delete-button {
  position: absolute;
  margin-top: 50px;
  left: 300px;
  background-color: #ff4d4f;
  color: white;
}

.container2 {
  position: relative; /* Relative positioning for absolute children */
  padding-top: 0px; /* Reduced padding to move the form up */
  padding-left: 20px; /* Padding to ensure 'Contacts' link is visible */
}
</style>
