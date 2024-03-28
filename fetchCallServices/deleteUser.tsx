export const deleteUser = async (
  userData: any,
  handleSignOut: () => Promise<void>
) => {
  try {
    // Confirm with the user before deleting the account
    const confirmed = window.confirm(
      "Tem a certeza que pretende apagar o seu perfil. Não conseguirá reverter a sua decisão!"
    );

    if (!confirmed) {
      // If the user cancels the action, return early
      return;
    }

    // Extract the _id from userData
    const { _id } = userData;
    console.log("user id to be deleted: ", _id);

    // Make a DELETE request to your backend API to remove the user

    const URL = `/api/deleteUser?userId=${_id}`;
    await fetch(URL, {
      method: "DELETE",
    });

    // After successful deletion

    alert("Utilizador apagado com sucesso!");
    await handleSignOut();
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};
