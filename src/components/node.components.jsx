import React, {useState, Fragment} from 'react';
import { FaStar, FaTimesCircle } from 'react-icons/fa';
import ReactFlow, {addEdge, Background, Controls, MiniMap} from 'react-flow-renderer';

const initialElements = [
    {id: '1', type: 'input', data:{label: 'Mind Node'}, position: {x:0,y:0}}
]
const onLoad = (reactFlowInstance) =>  {
    reactFlowInstance.fitView();
}

const MindNode = () => {

    const [elements, setElements] = useState(initialElements);
    const [name, setName] = useState("")
    const [selectedNode, setSelectedNode] = useState(null);
    
    const addNode = () => {
        setElements(e => e.concat({
            id: (e.length+1).toString(),
            data: {
                label: `${name}`,
                icon: <FaTimesCircle style={{position: 'absolute', top: -10, right: -10, color: 'red'}} onClick={() => deleteNode(e.length+1)} />
            },
            position: {x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight}
        }));
    };

    const deleteNode = (nodeId) => {
        setElements(e => e.filter(el => el.id !== nodeId.toString()));
    }
    const onNodeMouseMove = (event, node) => {
        event.preventDefault();
        setSelectedNode(node);
    }

    const onNodeMouseLeave = (event, node) => {
        setSelectedNode(null);
    }

    const onConnect = (params) => setElements(e => addEdge(params,e));

    const onNodeLeave = (event, node) => {
        setSelectedNode(null);
    }
    
    return(
        <Fragment>
            <ReactFlow
            elements={elements}
            onLoad={onLoad}
            style={{width:'100%',height: '90vh'}}
            onConnect = {onConnect}
            connectionLineStyle={{stroke: "#ddd", strokeWidth: 2}}
            connectionLineType = "bezier"
            snapToGrid = {true}
            snapGrid={[16,16]}
            onMouseEnter={onNodeMouseMove}
            onNodeMouseLeave={onNodeMouseLeave}
            >
                <Background
                color="#888"
                gap={16}
                />
                <MiniMap 
                nodeColor={n=>{
                    if(n.type === 'input') return 'blue';
                    
                    return '#FFCC00'
                }} />
                <Controls />
                {selectedNode && <FaTimesCircle style={{position: 'absolute', top: selectedNode.position.y - 25, right: selectedNode.position.x - 25, fontSize: 50, color: 'red'}} onClick={() => deleteNode(selectedNode.id)} />}
                </ReactFlow>
    
            <div>
                <input type="text"
                onChange={e => setName(e.target.value)}
                name="title"/>
                <button 
                type="button"
                onClick={addNode}
                >Add Node</button>
            </div>
        </Fragment>
    )
            }
       
export default MindNode;            
