<script>
		import LocalForage from 'localforage';

	if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('/service-worker.js')
		.then((registration) => {
		console.log('Service Worker registration completed with scope: ',
			registration.scope)
		}, (err) => {
		console.log('Service Worker registration failed', err)
		})
	})
	} else {
  		console.log('Service Workers not supported')}

	let todoList = LocalForage.getItem('todoList').then(val => {todoData =  val != null && val != undefined && val.length >0? [...val]:[], console.log('localforage ran')});
	console.log('todoList Initial', todoList)
	let todoData = []
	let newTodo = {task: ''}
	function saveToDo() {
		
		todoData = [...todoData, newTodo]
		console.log(todoData);
		LocalForage.setItem('todoList', todoData);
		console.log(todoList)
		newTodo = {task: ''};
	}
	function addManyToDos() {
		let i = 1
		while(i <= 1000){
			let todoToAdd = {task: i}
			todoData = [...todoData, todoToAdd];
			LocalForage.setItem('todoList', todoData); 
			i++
		}
	}
	function deleteToDo(index){
		console.log(index)
	    let filteredToDos =	todoData.filter((td,i) =>  i != index.i)
		todoData = filteredToDos
		LocalForage.setItem('todoList', todoData);
	}
</script>
<style>
	h1{color: blue}
</style>

<h1>Welcome to the ToDO List</h1>
<input bind:value={newTodo.task} /> 
<button on:click={saveToDo} >add ToDo</button>
<button on:click={addManyToDos}>add 1000 todos</button>

<table>
	<thead>
		<tr>
			<td>
				ToDo
			</td>
		</tr>
	</thead>
	<tbody>
		{#each todoData as todo,i}
			<tr>
				<td>{todo.task}</td>
				<td>
					<button on:click={() => deleteToDo({i})}>Delete</button>
				</td>
			</tr>
		{/each}
	</tbody>
</table>