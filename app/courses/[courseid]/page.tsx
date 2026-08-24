export default async function CourseDescription() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();
  console.log(data);
  return <div>Course description page is reashed</div>;
}
