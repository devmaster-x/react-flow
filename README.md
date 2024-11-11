# Senior frontend role

## My reasonsing for using additional libs

- react-modal for Edit and Create Node modal
- react-toastify for alarm notification
- react-icons for toolbox-icons

## The strategy for the unit tests

I just have the unit test written for DetailsBar component only for now

1. **Node Creation**
   - **Test Case:** Verify that a new node can be created
     - **Strategy:** Simulate the action of creating a node and check if the node appears in the node list with the correct default properties
   
2. **Node Editing Modal**
   - **Test Case:** Ensure that the modal opens when a node is clicked for editing
     - **Strategy:** Simulate a click event on a node and verify that the modal component renders with the correct initial state (e.g., current node name)
   - **Test Case:** Validate that the modal allows editing of the node name
     - **Strategy:** Simulate user input in the modal and check if the node name updates correctly in the state and UI after submission

3. **Node Dropping**
   - **Test Case:** Check that dropping a node opens the edit modal
     - **Strategy:** Simulate a drop event for a node and assert that the modal appears, allowing for immediate editing

4. **Node List Rendering**
   - **Test Case:** Verify that all nodes are rendered correctly in the UI
     - **Strategy:** After creating multiple nodes, check if all nodes are displayed in the node list with correct labels and types

5. **Edge Creation**
   - **Test Case:** Ensure edges can be created between nodes
     - **Strategy:** Simulate creating an edge between two nodes and validate that the edge appears in the UI representation of the graph

6. **Data Validation on Save**
   - **Test Case:** Validate that saving nodes and edges sends correct data to the Next.js endpoint
     - **Strategy:** Mock the API call and check that it receives the expected payload, including all nodes and their connections
   - **Test Case:** Ensure that invalid data does not get saved
     - **Strategy:** Simulate scenarios where nodes or edges have invalid properties and confirm that these cases are handled gracefully without attempting to save

## Getting started

First, run the development server:

```bash
nvm use
npm i
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.