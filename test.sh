echo '=== when the tests are green...'
gulp test
echo === exit code $? should be 0

echo '=== when the code is lint-free'
gulp lint
echo === exit code $? should be 0

echo '=== when the tests are red...'
echo 'describe("", () => { it("", () => { throw "fail" })})' > spec/shared/fail.js
gulp test
echo === exit code $? should be 1

echo '=== when the tests have a syntax error...'
echo 'describe("" "")' > spec/shared/fail.js
gulp test
echo === exit code $? should be 1

echo '=== when the linter sees a syntax error...'
gulp lint
echo === exit code $? should be 1

rm spec/shared/fail.js

echo '=== starting gulp watch...'
gulp watch & (
  sleep 2 &&
  echo '=== this test should fail...' &&
  echo 'describe("", () => { it("", () => { throw "fail" })})' > spec/shared/fail.js &&
  sleep 4 &&
  echo '=== this test should have a syntax error...' &&
  echo 'describe("" "")' > spec/shared/fail.js &&
  sleep 4 &&
  echo '=== cleaning up; tests should pass again...' &&
  rm spec/shared/fail.js &&
  sleep 4 &&
  pkill 'gulp' &&
  echo '=== done!'
)
