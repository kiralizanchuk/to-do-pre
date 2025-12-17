let tasks = [
	"Завершить курсовую работу",
	"Полить комнатные растения",
	"Изучить фреймворк Реакт",
	"Реализовать интерфейс проекта",
	"Прогулка на свежем воздухе в ясный день",
	"Вымыть кухонную посуду",
];

const todoList = document.querySelector(".to-do__list");
const formSubmit = document.querySelector(".to-do__form");
const taskInput = document.querySelector(".to-do__input");

function loadTasks() {
	const stored = localStorage.getItem("todos");
	if (stored) {
		return JSON.parse(stored);
	}
	return tasks;
}

function createItem(taskText) {
	const itemTemplate = document.getElementById("to-do__item-template");
	const element = itemTemplate.content.querySelector(".to-do__item").cloneNode(true);
	const taskDisplay = element.querySelector(".to-do__item-text");
	const removeBtn = element.querySelector(".to-do__item-button_type_delete");
	const copyBtn = element.querySelector(".to-do__item-button_type_duplicate");
	const editBtn = element.querySelector(".to-do__item-button_type_edit");

	taskDisplay.textContent = taskText;

	removeBtn.addEventListener("click", () => {
		element.remove();
		const currentTasks = extractTasksFromDOM();
		saveTasks(currentTasks);
	});

	copyBtn.addEventListener("click", () => {
		const text = taskDisplay.textContent;
		const duplicate = createItem(text);
		todoList.prepend(duplicate);
		const currentTasks = extractTasksFromDOM();
		saveTasks(currentTasks);
	});

	return element;
}

function extractTasksFromDOM() {
	const textElements = document.querySelectorAll(".to-do__item-text");
	const extractedTasks = [];
	textElements.forEach((element) => {
		extractedTasks.push(element.textContent);
	});
	return extractedTasks;
}

function saveTasks(updatedTasks) {
	localStorage.setItem("todos", JSON.stringify(updatedTasks));
}

formSubmit.addEventListener("submit", function (e) {
	e.preventDefault();
	const inputValue = taskInput.value;
	if (inputValue.trim() === "") {
		return;
	}
	const item = createItem(inputValue);
	todoList.prepend(item);
	tasks = extractTasksFromDOM();
	saveTasks(tasks);
	taskInput.value = "";
});

tasks = loadTasks();
tasks.forEach((task) => {
	const element = createItem(task);
	todoList.append(element);
});

