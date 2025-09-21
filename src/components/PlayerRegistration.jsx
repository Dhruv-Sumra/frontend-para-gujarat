try {
  await registerPlayer(playerData);
  toast.success('Player registered successfully!');
} catch (error) {
  // This will now show the specific error message from the server
  toast.error(error.message);
}