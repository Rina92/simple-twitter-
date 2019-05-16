var assert = require('assert');
const repo = require("../repository/repo")

describe('Db', function () {
    describe('Function called to data insert', function () {
        it('will validate if function is called successfully ', function () {
            assert.call(repo.InsertUserPost, "marly", "soliman");
        });
    });

    describe('Function called to data insert', function () {
        it('the saved value must have ID field', async function () {

            var data = await repo.InsertUserPost("testPost", "Testpost");

            console.log(data);
            
            if (data._id != null) {
                assert.ok(true);
            }
            else {
                assert.ok(false);
            }

        });
    });

});