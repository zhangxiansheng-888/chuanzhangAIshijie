# Test Results

Date: 2026-07-14

Method: main-flow fallback self-test. Independent sub-agent blind testing was not used in this pass.

## Result

15 / 15 passed.

## Notes

- Positive cases trigger on clear real-person portrait signals: 上传真人照片, AI 人像写真, 保留本人长相, 情侣写真, 九宫格写真.
- Added coverage for photography-language conversion: 焦段, 光圈, 景深, 光线, 职业头像, 生活方式人像, 摄影感 prompt.
- Added coverage for article-reading workflow, variable extraction, texture vocabulary, and completeness checks.
- Added coverage for face detail, makeup systems, filter recipes, identity constraints, and retouching levels.
- Negative cases avoid overlap with the general still-image prompt skill and video storyboard skills.
- Boundary cases keep the skill from activating on anime avatars and ordinary ID photos unless identity-preserving portrait photography is explicitly requested.
