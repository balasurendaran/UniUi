/**
 * Utility hook to handle section-level actions in react-hook-form forms.
 * Example usage: const { handleAction } = useRHFSectionActions({ reset, setValue, getValues });
 */

export function useRHFSectionActions({ reset, setValue, getValues }) {
  console.log("🚀 ~ useRHFSectionActions ~ getValues:", getValues);
  console.log("🚀 ~ useRHFSectionActions ~ setValue:", setValue);
  console.log("🚀 ~ useRHFSectionActions ~ reset:", reset);
  /**
   * Handles a section action based on its type.
   * @param {object} action - The action object (from your config).
   * @param {object} [payload] - Optional payload for the action.
   */
  function handleAction(action, payload) {
    switch (action.type) {
      case "add":
        // Example: reset the form or add a new item
        if (typeof reset === "function") reset();
        break;
      case "edit":
        // Example: set a value or open edit mode
        if (payload && payload.name && typeof setValue === "function") {
          setValue(payload.name, payload.value);
        }
        break;
      case "delete":
        // Example: clear a value
        if (payload && payload.name && typeof setValue === "function") {
          setValue(payload.name, undefined);
        }
        break;
      case "view":
        // Example: log current values
        if (typeof getValues === "function") {
          console.log("Current values:", getValues());
        }
        break;
      case "copy":
        // Example: copy values to clipboard
        if (typeof getValues === "function") {
          navigator.clipboard.writeText(JSON.stringify(getValues()));
        }
        break;
      // Add more cases as needed for your actions
      default:
        // Custom or unhandled action
        break;
    }
  }

  return { handleAction };
}
