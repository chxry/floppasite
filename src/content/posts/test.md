---
title: test post
description: markdown syntax testing
date: 2024-08-08
---

# test post

The quick _brown_ **fox** jumped over the **_lazy_** dog. Inline `code` and [links](/blog/hidden).

> blockquote

```rust
fn main() {
    println!("code block");
}

fn safe(nums: &[i32]) -> bool {
  let dir = nums[0] < nums[nums.len() - 1];
  for i in 1..nums.len() {
    if !((1..=3).contains(&nums[i].abs_diff(nums[i - 1])) && (nums[i - 1] < nums[i]) == dir) {
      return false;
    }
  }
  true
}
```

### ordered list

- apples
- oranges

### unordered list

1. apples
2. pears
