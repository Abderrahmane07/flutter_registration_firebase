import 'package:api_test/models/article.dart';
import 'package:api_test/services/remote_service.dart';
import 'package:flutter/material.dart';
import 'package:flutter_html/flutter_html.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  Article? article;
  var isLoaded = false;

  @override
  void initState() {
    super.initState();
    getData();
  }

  getData() async {
    article = await RemoteService().getArticle();
    if (article != null) {
      setState(() {
        isLoaded = true;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Article'),
      ),
      body: Visibility(
        visible: isLoaded,
        child: ListView.builder(
          itemBuilder: (context, index) {
            // return Text(article!.query.pages.the736.extract);
            return Html(
              data: article!.query.pages.the736.extract,
            );
          },
          itemCount: 1,
        ),
        replacement: const Center(
          child: CircularProgressIndicator(),
        ),
      ),
    );
  }
}
