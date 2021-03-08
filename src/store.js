import {writable} from 'svelte/store';
import localforage  from 'localforage';
const lf = localforage;



export const todoList = writable(lf.getItem('todoList', (val)=> todoList.set(val)))

todoList.subscribe(val => lf.setItem('todoList', val));

