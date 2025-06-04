## Summary

In this two-hour-timeboxed assignment, I reviewed the code, came up with a plan and executed on two focused areas for improvement. The first pass addressed some critical bugs and anti-patterns while the second revamped the UI using Tailwind (with an attempt to match Solace's branding) and improve responsiveness for mobile. By concentrating on high-impact and low-effort changes, such as fixing the client-side filtering and adding Typescript types, I delivered a more polished and user-friendly advocate directory that can serve as a foundation for future updates.

-- Greg Hosin

## The Plan

### 1. Prep: Get the app up and running

- [x] Clone + setup
- [x] Seed database
- [x] Review code

### 2. Plan: Pick high-leverage improvements

- [x] List bugs and anti-patterns
- [x] List visual improvements w/ Tailwind
- [x] Find ways to enhance usability and responsiveness

### 3. Code & Commit: 3 separate PRs (30 mins - 1hr each)

1. [x] Bug fixes, anti-patterns cleanup

- make sure JSON is returned correctly in API route
- introduce Advocate TS interface, and added React types
- update onChange filering
- add missing key props

2. [x] Design / UI pass

- add proper spacing and formatting
- style search bar/reset buttons
- create mobile-first cards layout and responsible table

3. [ ] Optimization

- add debounce logic to save on unnecessary API calls

### 4. Wrap-up

- [x] Write `DISCUSSION.md`

## Tradeoffs

Because of the two-hour time limit, I prioritized high-impact and low-effort changes that would immediately improve functionality and end-user experience:

- client-side filtering vs. server-side search: To get to a working MVP, I left the filtering in the client. With more time, I would have implemented backend pagination and search params to handle larger datasets, so that all advocates wouldn't need to be loaded at once.
- debounce vs. caching: The current implementation filters on debounce of 300ms, while snappy may add unecessary re-rendering and API calls. As I follow-up I would add additional client and server-side caching to address this.
- Basic UX vs. error handling: I included a basic no-results state, but did not build out a Loading spinner or error messaging, logical future additions.

## Future enhancements

### Front-end

- improved table formatting: adding fixed table width, rather than content-based sizing will prevent columns such as 'specialties' from pushing into the other columns
- loading and error states: display a loading spinner while data is fetching. Show friendly error messages if API calls fail.

### Backend

- DB indexing: add an index for common searches in order to provide faster responses and efficient queries.
- Use materialized views for high-traffic queries.
- Caching: intorduce Redis for caching of frequently requested searches. Serve cached results for a set period of time and then revalidate.
- DX: Add unit testing, Github actions, ESLint, Typescript checks, even AI reviews for each PR.

With these improvements, the advocates directory could scale and handle thousands of records seamlessly, while remaining a smooth user experience.

Thank you for taking the time to review my submission and your consideration!
