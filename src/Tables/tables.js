export function executeQuery(query) {
  if (query === "select * from customer") return table1;
  else return { headers: [], data: [{}] };
}

const table1 = {
  headers: ["ID", "FirstName", "LastName", "Username"],
  data: [
    {
      id: "1",
      firstName: "Vishavjeet",
      lastName: "Singh",
      username: "VishavKamboj",
    },
    {
      id: "2",
      firstName: "Vishavjeet",
      lastName: "Singh",
      username: "VishavKamboj",
    },
    {
      id: "3",
      firstName: "Vishavjeet",
      lastName: "Singh",
      username: "VishavKamboj",
    },
    {
      id: "4",
      firstName: "Vishavjeet",
      lastName: "Singh",
      username: "VishavKamboj",
    },
    {
      id: "5",
      firstName: "Vishavjeet",
      lastName: "Singh",
      username: "VishavKamboj",
    },
    {
      id: "6",
      firstName: "Vishavjeet",
      lastName: "Singh",
      username: "VishavKamboj",
    },
  ],
};
