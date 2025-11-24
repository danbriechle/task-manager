# II. Technical Assessment 45 minutes)

Build a small full-stack application that allows users to create, view, update, delete, and
search tasks (or notes/tickets). Think of it as a lightweight “Task Managerˮ.
The goal is to evaluate your ability to design, implement, and integrate both frontend and
backend components while demonstrating code quality, documentation, and project
structure. We would also like the deployment of the application to be containerized using
docker.

## Submission Instructions

1. Create a GitHub repository for your project.
2. Include all source code and a clear README explaining how to:
   ○ Run the backend API
   ○ Run the frontend application
   ○ Any setup or configuration needed
3. Ensure the app can be run locally with minimal setup.

## Development plan

### Backend

1. Create a task object in the db. Should have Varchar (specify length): title, Text: content at a minimum, enum: status
   probably worht thinking about maybe a due date, user assignment (not in this itteration but should be fleible enough to expand to that easilly)
   Off the top of my head I see a task has many users through user assignments, and visa versa
2. Create some curlable CRUD - might be kinda nice to expose a singular graphql endpoint from the get go for getting all the things.
   Lets skip graphql for now.

3. Seed gen 50 Todos

### Frontend

3. Throw it on the landing page for now.

Components:

- navbar containing search bar and new
- searchbar (thinking search will be a client side filter rather than a db fuzzy in PG)
- Row container
- card container (want edit functonality directly in the card)
- title (atomic)
- text content (atomic)
- create modal

(Things to think about here)
app is "small" so we probably dont have to worry about 100k todos but lets so we dont back ourselves into a corner
at scale (lets say it sa task manager for a global org)

- we would probably want to some deeper todo segmentation / categories
- we would want some scroll loading (thinking insta/ or shopping site like nordstrom)
- I do prefer that to pagination. "here's 30 pages of todos" thats not a meanigful ux.
- At scale we would probably do a hybrid search (frontend filter + PG fuzzy)

4. Handle the create modal/ background blur DOM flow

5. Wire up your 50 seeded todos and see how ugly things look

6. Search (live dom filter) - we have a title field / text field here so simple type filter wouldnt be the worst

   - need to make some decisions on how things look based on possible search senarios do we want to

   - handle whole word with correct spelling only (prob a good place to start) Lets do that and see how clunky it is (improve if needed)
     -map out how the search should feel
     -user types keyword title card is isolated, how does dom re draw? annimation? then what?
     -do we want to search within search?

### future things to make things purdy

1. add a due date + due status + search by date, search by due status
2. add users / user assignments + search by users (search by user might be a good test case for hybrid search / filter)
3. add tagging
4. idea of sub tickets (off the top of my head this one is a of kind interesting split between backend and frontend)
   - the frontend is simple we want a parent task object to have an array of subs when it comes over
   - backend is different
   - arrays in the db are stupid so we wont do that
   - could create a totally same same but new type of task called a sub (this feels duplicative and dumb)
   - could add a parent_id column to task object, this might back us into some weird search things especially at scale (so far this is my favorite I think)
   - graphql would make the parrent id search piece and initial DOM draw nicer.
