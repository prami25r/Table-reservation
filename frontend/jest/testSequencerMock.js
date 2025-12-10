class TestSequencer {
  sort(tests) {
    return tests;
  }

  shard(tests) {
    return tests;
  }

  cacheResults() {
    // noop
  }
}

module.exports = TestSequencer;
module.exports.default = TestSequencer;

