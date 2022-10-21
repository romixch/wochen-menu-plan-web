
const log = async (message: string) => {
  console.log(message)
}

const logView = async (view: string) => {
  log("View_" + view);
}

const logAction = async (action: string) => {
  log("Action_" + action);
}

export { log, logView, logAction }