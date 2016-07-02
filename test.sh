echo '=== when the tests are green...'
gulp check
echo === exit code $? should be 0

echo '=== when the code is lint-free'
gulp check
echo === exit code $? should be 0

echo '=== when the tests are red...'
echo 'describe("", () => { it("", () => { throw "fail" })})' > src/spec/fail.js
gulp check
echo === exit code $? should be 1

echo '=== when the tests have a syntax error...'
echo 'describe("" "")' > src/spec/fail.js
gulp check
echo === exit code $? should be 1

rm src/spec/fail.js

echo '=== starting gulp watch...'
gulp watch & (
  sleep 2 &&
  echo '=== this test should fail...' &&
  echo 'describe("", () => { it("", () => { throw "fail" })})' > src/spec/fail.js &&
  sleep 4 &&
  echo '=== this test should have a syntax error...' &&
  echo 'describe("" "")' > src/spec/fail.js &&
  sleep 4 &&
  echo '=== cleaning up; tests should pass again...' &&
  rm src/spec/fail.js &&
  sleep 4 &&
  pkill 'gulp' &&
  echo '=== done!'
)
