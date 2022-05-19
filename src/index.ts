import { button } from "element-mold/dist/html";
import { EditorControl, EditorNode, EditorView, SnaplineView, TransformView } from "./editor";
import './index.css';

let nodeId = 0;
const addButton = button({innerText: 'Add', onclick: () => {
  const node = new EditorNode({
    id: nodeId++,
    width: 120,
    height: 120,
    background: '#' + Array.from({length: 3}, () => Math.floor(Math.random() * 255).toString(16).padStart(2, '0')).join(''),
  });
  editorControl.add(node);
}});
document.body.appendChild(addButton);

const editorControl = new EditorControl();
const transformView = new TransformView();
document.body.appendChild(transformView.container);
const editorView = new EditorView();
document.body.appendChild(editorView.container);
const snaplineView = new SnaplineView();
document.body.appendChild(snaplineView.container);

editorView.container.style.width = '100%';
editorView.container.style.height = '100%';
editorControl.subscirbe(editorView);
editorControl.subscirbe(transformView);
editorControl.subscirbe(snaplineView);

for (const i of Array(10)) {
  editorControl.add(new EditorNode({
    id: nodeId++,
    x: Math.floor(Math.random() * 600),
    y: Math.floor(Math.random() * 600),
    width: Math.floor(Math.random() * 300) + 50,
    height: Math.floor(Math.random() * 300) + 50,
    background: '#' + Array.from({length: 3}, () => Math.floor(Math.random() * 255).toString(16).padStart(2, '0')).join(''),
  }));
}