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

function retrieveTasks() {
	const stored = localStorage.getItem("todos");
	if (stored) {
		return JSON.parse(stored);
	}
	return tasks;
}

function buildTaskElement(taskText) {
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
		persistTasks(currentTasks);
	});

	copyBtn.addEventListener("click", () => {
		const text = taskDisplay.textContent;
		const duplicate = buildTaskElement(text);
		todoList.prepend(duplicate);
		const currentTasks = extractTasksFromDOM();
		persistTasks(currentTasks);
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

function persistTasks(updatedTasks) {
	localStorage.setItem("todos", JSON.stringify(updatedTasks));
}

formSubmit.addEventListener("submit", (e) => {
	e.preventDefault();
	const inputValue = taskInput.value;
	if (inputValue.trim() === "") {
		return;
	}
	const item = buildTaskElement(inputValue);
	todoList.prepend(item);
	tasks = extractTasksFromDOM();
	persistTasks(tasks);
	taskInput.value = "";
});

tasks = retrieveTasks();
tasks.forEach((task) => {
	const element = buildTaskElement(task);
	todoList.append(element);
});

